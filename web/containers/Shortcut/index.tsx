export default function ShortCut(props: { menu: string }) {
  const { menu } = props
  const symbol = isMac ? '⌘' : 'Ctrl + '

  return (
    <div className="inline-flex items-center justify-center rounded-full py-0.5 pl-1 text-xs font-bold">
      <p>{symbol + menu}</p>
    </div>
  )
}
