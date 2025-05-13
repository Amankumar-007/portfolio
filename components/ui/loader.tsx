export const Loader = () => {
  return (
    <div className="relative">
      <div className="relative bg-[#473c3c] h-[130px] w-[130px] rounded-full mx-auto my-[30px]">
        <div className="absolute top-[30px] left-[40px] w-[50px] h-[70px] animate-hourglassRotate [transform-style:preserve-3d] [perspective:1000px]">
          <div className="[transform-style:preserve-3d] hourglassCurves before:content-[''] before:block before:absolute before:top-[32px] before:w-[6px] before:h-[6px] before:rounded-full before:bg-[#333] before:left-[15px] before:animate-hideCurves after:content-[''] after:block after:absolute after:top-[32px] after:w-[6px] after:h-[6px] after:rounded-full after:bg-[#333] after:left-[29px] after:animate-hideCurves" />
          <div className="hourglassCapTop top-0" />
          <div className="absolute top-[-16px] left-[3px] rounded-full w-[44px] h-[44px] bg-[#999999] [transform:rotateX(90deg)]" />
          <div className="absolute left-[24px] w-[3px] bg-white before:content-[''] before:block before:absolute before:animate-sandStream1" />
          <div className="absolute top-[36px] left-[19px] border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-b-[6px] border-b-white animate-sandStream2" />
          <div className="hourglassCapBottom bottom-0" />
          <div className="[perspective:100px] absolute top-[32px] left-[20px] w-[10px] h-[6px] bg-[#999999] opacity-50 before:content-[''] before:block before:absolute before:bg-[#999999] before:left-[-17px] before:w-[44px] before:h-[28px] before:top-[-27px] before:rounded-b-[25px] after:content-[''] after:block after:absolute after:bg-[#999999] after:left-[-17px] after:w-[44px] after:h-[28px] after:bottom-[-27px] after:rounded-t-[25px]" />
          <div className="before:content-[''] before:block before:absolute before:left-[6px] before:bg-white before:[perspective:500px] before:top-[8px] before:w-[39px] before:rounded-[3px_3px_30px_30px] before:animate-sandFillup after:content-[''] after:block after:absolute after:left-[6px] after:bg-white after:[perspective:500px] after:rounded-[30px_30px_3px_3px] after:animate-sandDeplete" />
        </div>
      </div>
    </div>
  );
}
