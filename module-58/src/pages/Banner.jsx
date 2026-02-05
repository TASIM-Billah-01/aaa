import { easeOut, motion } from "motion/react";
import image1 from '../assets/team/WhatsApp Image 2026-01-23 at 12.30.46 PM.jpeg'
import image2 from '../assets/team/WhatsApp Image 2026-01-23 at 12.30.47 PM.jpeg'
const Banner = () => {
    return (
        <div>
            <section className="flex justify-between">
                <article className="flex-1 bg-red-200">
                    
                    <motion.h1 
                    animate={{x : 50 , color : ['red', 'green']}}
                    transition={{duration : 2, delay : 1, ease : easeOut, repeat: Infinity}}
                    className="text-4xl font-bold"
                    >
                        latest
                        <motion.span 
                        animate={{color : ['#F54927','#F59827','#27F5D6']}}
                        transition={{duration : 2,repeat:Infinity}}
                        >
                            job
                        </motion.span>
                        portal
                    </motion.h1>
                </article>
                <article className="flex-1 bg-green-200">
                    <motion.img  
                    src={image1} alt="" 
                    animate={{y : [50,100,50]}}
                    transition={{duration : 10,repeat:Infinity}}
                    className="mx-auto max-w-sm rounded-t-3xl rounded-br-3xl border-l-4 border-b-4 border-blue-400" />
                    <motion.img  
                    src={image2} alt="" 
                    animate={{x : [100,150,100]}}
                    transition={{duration : 10,delay:5, repeat:Infinity}}
                    className="mx-auto max-w-sm rounded-t-3xl rounded-br-3xl border-l-4 border-b-4 border-blue-400" />
                </article>
                
            </section>
        </div>
    );
};

export default Banner;