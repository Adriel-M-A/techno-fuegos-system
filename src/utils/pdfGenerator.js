import { jsPDF } from 'jspdf'
import 'jspdf-autotable'
import { save } from '@tauri-apps/plugin-dialog'
import { writeFile } from '@tauri-apps/plugin-fs'
import { formatARS } from './currencyFormatters'

/**
 * Genera y guarda físicamente el PDF de un presupuesto con diseño monocromático de taller.
 * @param {Object} data - Datos del presupuesto (cliente, filas, subtotales, totales, observaciones).
 * @param {Array} catalog - Catálogo de productos para resolver nombres desde IDs.
 */
export async function generateAndSavePresupuestoPDF(data, catalog = []) {
  try {
    // 1. Mostrar diálogo de guardado
    const fechaStr = new Date().toISOString().split('T')[0]
    const defaultFilename = `Presupuesto_${data.nombreCliente || 'Generico'}_${fechaStr}.pdf`.replace(/\s+/g, '_')
    
    const filePath = await save({
      title: 'Exportar PDF de Taller',
      defaultPath: defaultFilename,
      filters: [{ name: 'PDF Document', extensions: ['pdf'] }]
    })

    if (!filePath) {
      // El usuario canceló el diálogo
      return { success: false, cancelled: true }
    }

    // 2. Generación del documento
    // Diseño estrictamente monocromático para taller
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    })

    // Configuración de fuentes
    doc.setFont('courier', 'normal') // Fuente monoespaciada requerida por regla para totales/estética industrial
    
    // Título Principal
    doc.setFontSize(18)
    doc.setFont('courier', 'bold')
    doc.text('PRESUPUESTO DE TALLER', 14, 20)

    // Datos del Cliente y Generales
    doc.setFontSize(10)
    doc.setFont('courier', 'normal')
    let startY = 30
    
    doc.text(`FECHA: ${new Date().toLocaleDateString('es-AR')}`, 14, startY)
    doc.text(`CLIENTE: ${data.nombreCliente || 'Consumidor Final'}`, 14, startY + 6)
    if (data.telefonoCliente) doc.text(`TELÉFONO: ${data.telefonoCliente}`, 14, startY + 12)
    if (data.localidadCliente) doc.text(`LOCALIDAD: ${data.localidadCliente}`, 14, startY + 18)
    if (data.emailCliente) doc.text(`EMAIL: ${data.emailCliente}`, 14, startY + 24)

    startY = data.emailCliente ? startY + 34 : startY + 28

    // Descripción General
    if (data.descripcionGeneral && data.descripcionGeneral.trim() !== '') {
      doc.setFont('courier', 'bold')
      doc.text('DESCRIPCIÓN GENERAL:', 14, startY)
      doc.setFont('courier', 'normal')
      
      const descLines = doc.splitTextToSize(data.descripcionGeneral, 180)
      doc.text(descLines, 14, startY + 6)
      
      startY = startY + 6 + (descLines.length * 5) + 6
    }

    // Tabla de Ítems (Autotable maneja el reflow y salte de página)
    const tableData = data.productRows
      .filter(row => row.product_id !== '') // Limpiar filas vacías
      .map(row => {
        const prod = catalog.find(p => p.id === row.product_id)
        const nombre = prod ? prod.nombre : 'Item Desconocido'
        // Safe Money: operar multiplicaciones en enteros antes de formatear
        const totalFilaCentavos = row.unit_price_centavos * row.quantity
        return [
          nombre,
          row.quantity.toString(),
          formatARS(row.unit_price_centavos),
          formatARS(totalFilaCentavos)
        ]
      })

    // Usamos jspdf-autotable montado sobre doc
    doc.autoTable({
      startY: startY,
      head: [['MATERIAL / SERVICIO', 'CANTIDAD', 'P. UNITARIO', 'SUBTOTAL']],
      body: tableData,
      theme: 'plain', // Estilo en blanco y negro sin fondos de colores
      styles: {
        font: 'courier',
        fontSize: 9,
        cellPadding: 3,
        textColor: 0, // Negro puro
        lineColor: 0,
        lineWidth: 0.1
      },
      headStyles: {
        fontStyle: 'bold',
        textColor: 0,
        fillColor: 255, // Fondo blanco (sin gris/color)
        lineWidth: 0.5,
        lineColor: 0
      },
      columnStyles: {
        0: { cellWidth: 80 },
        1: { halign: 'center', cellWidth: 25 },
        2: { halign: 'right', cellWidth: 40 },
        3: { halign: 'right', cellWidth: 40 }
      },
      margin: { left: 14, right: 14 }
    })

    const finalY = doc.lastAutoTable.finalY || startY + 10

    // Resumen de Totales al final de la tabla
    const totalesStartY = finalY + 10
    
    doc.setFont('courier', 'normal')
    doc.text('SUBTOTAL MATERIALES:', 110, totalesStartY)
    doc.text(formatARS(data.subtotalCentavos), 196, totalesStartY, { align: 'right' })

    doc.text('MANO DE OBRA:', 110, totalesStartY + 6)
    doc.text(formatARS(data.manoDeObraCentavos), 196, totalesStartY + 6, { align: 'right' })

    doc.setFontSize(12)
    doc.setFont('courier', 'bold')
    doc.text('TOTAL GENERAL:', 110, totalesStartY + 16)
    doc.text(formatARS(data.totalCentavos), 196, totalesStartY + 16, { align: 'right' })

    // Observaciones al pie
    if (data.observaciones && data.observaciones.trim() !== '') {
      let obsY = totalesStartY + 26
      // Si nos pasamos de la página, creamos una nueva
      if (obsY > 270) {
        doc.addPage()
        obsY = 20
      }
      doc.setFontSize(10)
      doc.text('OBSERVACIONES LOGÍSTICAS / INTERNAS:', 14, obsY)
      doc.setFont('courier', 'normal')
      
      const obsLines = doc.splitTextToSize(data.observaciones, 180)
      doc.text(obsLines, 14, obsY + 6)
    }

    // 3. Obtener Uint8Array y escribir físicamente en disco usando el plugin de fs de Tauri
    const pdfArrayBuffer = doc.output('arraybuffer')
    const uint8Array = new Uint8Array(pdfArrayBuffer)
    
    await writeFile(filePath, uint8Array)

    return { success: true, filePath }
  } catch (error) {
    console.error('Error exportando PDF:', error)
    return { success: false, error }
  }
}
