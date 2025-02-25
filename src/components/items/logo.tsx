import { Link } from "react-router";
const textSizes = {
  "sm": "!text-sm",
  "md": "!text-md",
  "lg": "!text-lg",
  "xl": "!text-xl",
  "2xl": "!text-2xl",
  "4xl": "!text-4xl",
  "5xl": "!text-5xl",
  "6xl": "!text-6xl",
  "7xl": "!text-7xl",
  "8xl": "!text-8xl",
  "9xl": "!text-9xl",
};

interface LogoProps {
  text?: keyof typeof textSizes;
  wh?: string;
  h?: string;
}
export const Logo = ({ text ="9xl", wh = "w-4/5 h-2", h= "h-16"}: LogoProps) => {
  return (
    <Link to="/" className="flex justify-center items-center z-1">
      <div className="relative inline-block cursor-pointer">
            <h1 className={`!font-allura ${textSizes[text]} text-black relative z-10`}>
            habit tracker
          </h1>
            <div className="relative">
                <div className={` ${wh} bg-mint-500`}></div>
                <img
                className={`${h} rotate-90 absolute top-1/2 right-0 transform -translate-y-1/2`}
                src="./strawberry.png"
                />
            </div>
        </div>
    </Link>
  );
};