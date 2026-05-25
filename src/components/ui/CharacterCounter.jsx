// Componente atómico CharacterCounter para contar y mostrar límites de caracteres de forma discreta
export default function CharacterCounter({ currentLength = 0, maxLength = 100 }) {
  const isNearLimit = currentLength >= maxLength * 0.9
  const isAtLimit = currentLength >= maxLength

  const colorClass = isAtLimit
    ? 'text-error font-bold'
    : isNearLimit
      ? 'text-tertiary-container font-medium'
      : 'text-on-surface-variant/70'

  return (
    <div className={`text-[10px] font-mono text-right select-none ${colorClass}`}>
      {currentLength} / {maxLength}
    </div>
  )
}
