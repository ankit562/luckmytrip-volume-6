import { CircleCheck, CircleX } from "lucide-react";
import { Link } from "react-router-dom";

export default function TravelCard({
    title,
    logo,
    features = [],
    restrictions = [],
    buttonText = "LEARN MORE",
}) {




    return (
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg border border-gray-100 px-3 sm:px-4 md:px-5 lg:px-5 xl:px-5 py-3 sm:py-4 md:py-4 lg:py-5 xl:py-5 w-full min-w-[260px] max-w-[300px] sm:max-w-[340px] md:max-w-[360px] lg:max-w-[380px] xl:max-w-xl mx-auto flex flex-col justify-between min-h-[320px] sm:min-h-[350px] md:min-h-[380px] lg:min-h-[400px] xl:min-h-[400px]">
            <div className="flex justify-center items-start gap-2 sm:gap-2.5 md:gap-3 lg:gap-3 xl:gap-4 mt-1 sm:mt-2 md:mt-2">
                <div className="relative flex-shrink-0 mb-2 sm:mb-2 md:mb-3 lg:mb-4 min-w-[70px] sm:min-w-[85px] md:min-w-[90px] lg:min-w-[95px] xl:min-w-[100px]">
                    <h3 className="relative text-[2.75rem] sm:text-5xl md:text-6xl lg:text-6xl xl:text-7xl font-black font-berlin tracking-wider" style={{
                        WebkitTextStroke: '1px #FF6B8A',
                        color: 'transparent',
                        letterSpacing: '0.1em'
                    }}>{logo}</h3>
                     <h3 className="font-black absolute z-20 top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 text-lg sm:text-xl md:text-2xl lg:text-2xl xl:text-3xl text-[#1e3a5f] font-berlin whitespace-nowrap">{title}</h3>
                </div>
                <div className="flex-1">
                    <ul className="space-y-1 sm:space-y-1.5 md:space-y-2 lg:space-y-2.5 xl:space-y-3 mb-3 sm:mb-4 md:mb-6 lg:mb-7 xl:mb-8">
                        {features.map((text, idx) => (
                            <li key={idx} className="flex items-start gap-1 sm:gap-1.5 md:gap-2 lg:gap-2 xl:gap-2.5 text-gray-800 font-medium">
                                <CircleCheck className="text-[#4CAF50] w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 lg:w-4 lg:h-4 xl:w-5 xl:h-5 flex-shrink-0 mt-0.5" strokeWidth={2.5} />
                                <p className="text-[9px] sm:text-[10px] md:text-xs lg:text-xs xl:text-base leading-snug font-montserrat">
                                    {text}
                                </p>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <hr className="my-1.5 sm:my-2 md:my-2 lg:my-2.5 xl:my-3 border-gray-200" />
            <div className="flex justify-between items-center gap-0.5 sm:gap-1 md:gap-1.5 lg:gap-1.5 xl:gap-2 my-1.5 sm:my-2 md:my-2 lg:my-3 xl:my-4 flex-wrap">
                {restrictions.map((text, idx) => (
                    <div key={idx} className="flex items-center gap-0.5 sm:gap-1 md:gap-1 lg:gap-1.5 xl:gap-1.5 font-medium text-[9px] sm:text-[10px] md:text-[10px] lg:text-xs xl:text-sm text-gray-700">
                        <CircleX className="text-[#E91E63] w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-3.5 md:h-3.5 lg:w-4 lg:h-4 xl:w-5 xl:h-5 flex-shrink-0" strokeWidth={2.5} />
                        <span className="whitespace-nowrap font-montserrat">{text}</span>
                    </div>
                ))}
            </div>
            
            <div className="flex justify-end mt-1.5 sm:mt-2 md:mt-2 lg:mt-2.5 xl:mt-3">
                <Link to={"/termsandconditions"}>
                <button  className="bg-[#00ACC1] hover:bg-[#0097A7] rounded-lg sm:rounded-xl py-1.5 sm:py-2 md:py-2 lg:py-2.5 xl:py-3 px-3 sm:px-5 md:px-5 lg:px-6 xl:px-8 text-[10px] sm:text-xs md:text-xs lg:text-sm xl:text-base font-bold text-white shadow-md hover:shadow-lg transition-all duration-200 w-auto min-w-[90px] sm:min-w-[100px] md:min-w-[110px] lg:min-w-[120px] xl:min-w-[140px] uppercase font-montserrat">
                    {buttonText}
                </button>
                </Link>
            </div>
        </div>
    );
}
