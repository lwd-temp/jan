type Props = {
  description: string
}
export default function Loader({ description }: Props) {
  return (
    <div className="bg-background/90 fixed inset-0 z-50 flex h-full items-center justify-center gap-y-4 rounded-lg backdrop-blur-sm">
      <div className="space-y-16">
        <div className="loader">
          <div className="loader-inner">
            <label className="bg-primary h-2 w-2 rounded-full" />
            <label className="bg-primary h-2 w-2 rounded-full" />
            <label className="bg-primary h-2 w-2 rounded-full" />
            <label className="bg-primary h-2 w-2 rounded-full" />
            <label className="bg-primary h-2 w-2 rounded-full" />
            <label className="bg-primary h-2 w-2 rounded-full" />
          </div>
        </div>
        <p className="text-muted-foreground font-medium">{description}</p>
      </div>
    </div>
  )
}
