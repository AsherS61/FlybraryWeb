export default function BannerSection() {
  return (
    <div className='flex min-h-[400px] flex-col items-start gap-10 overflow-hidden pb-12 md:flex-row md:items-center'>
      {/* Text */}
      <div className='z-10 h-full w-full bg-gradient-to-r from-white/90 from-60% to-transparent to-90% xl:bg-none flex flex-col justify-evenly gap-8 md:min-h-[400px]'>
        <div className='flex flex-col gap-6 lg:gap-8 2xl:w-3/4'>
          <div className='flex flex-col gap-3'>
            <h1 className='text-pretty text-5xl font-semibold leading-tight text-main-1 lg:text-6xl'>
              Flybrary
            </h1>
            <p className='w-full text-pretty text-sm text-main-2 sm:text-base'>
              GET BOOKS
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}