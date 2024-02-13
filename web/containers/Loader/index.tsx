type Props = {
  description: string
}
export default function Loader({ description }: Props) {
  return (
    <div className="fixed inset-0 z-50 flex h-full items-center justify-center gap-y-4 rounded-lg bg-black/80 text-white backdrop-blur-md">
      <div className="space-y-16">
        <div className="loader">
          <div className="loader-inner">
            <label className="h-2 w-2 rounded-full bg-white" />
            <label className="h-2 w-2 rounded-full bg-white" />
            <label className="h-2 w-2 rounded-full bg-white" />
            <label className="h-2 w-2 rounded-full bg-white" />
            <label className="h-2 w-2 rounded-full bg-white" />
            <label className="h-2 w-2 rounded-full bg-white" />
          </div>
        </div>
        <p className="text-muted-foreground font-medium">{description}</p>
      </div>
    </div>
  )
}
