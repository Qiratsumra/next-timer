'use client';
import {useEffect,useState,useRef, ChangeEvent} from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';


export default function Countdown() {

    const [duration,setDuration] = useState<number | string>("");
    const [timeLeft,setTimeLeft] = useState<number>(0);
    const [isActive,setIsActive] = useState<boolean>(false);
    const [isPaused,setIsPaused] = useState<boolean>(false);

    const timeref = useRef<NodeJS.Timeout | null>(null);
    // Functions to handle setting the duration of the countdown
    const countdownHandler = () => {
   if (typeof duration === 'number' && duration>0) {
    setTimeLeft(duration);
    setIsActive(false);
    setIsPaused(false);
    if (timeref.current) { clearInterval(timeref.current)}
   }
    }

    // Function handler for START TIMER
    const handlerStart = () => {
     if (timeLeft > 0) {
        setIsActive(true)
        setIsPaused(false)
     }
    }

     // Function handler for PAUSE
    const handlePause = () => {
        if (isActive) {
            setIsPaused(true);
            setIsActive(false);
            if(timeref.current){ clearInterval(timeref.current) }
        }
    }
     // Function handler for RESET
     const handleReset = () => {
        setIsActive(false);
        setIsPaused(false)
        // here is reset for reset
        setTimeLeft(typeof duration === 'number' ? duration : 0 );
        if(timeref.current){ clearInterval(timeref.current) }
     }

    //  useEffect for counter logic
    useEffect(()=>{
        if (isActive && !isPaused) {
            timeref.current = setInterval(()=>{
                setTimeLeft((prevTime)=>{
                if (prevTime<=1) { clearInterval(timeref.current!); return 0; };
                return prevTime -1;
                })
            },1000);
            return ()=>{
                if(timeref.current){ clearInterval(timeref.current) };
            }
        }
    },[isActive,isPaused]);

    // Time Formatter 
    const fromatter = (time:number):string => {
    let hours  =  Math.floor(time/60);
    let minutes = time%60
    return ` ${String(hours).padStart(2,'0')}  : ${String(minutes).padStart(2,'0')}`
    };

    // function for input change 
    const handleInputChange = (e:ChangeEvent<HTMLInputElement>):void =>{
    setDuration(Number(e.target.value)||"")
    } 
    return(
        <div className='flex flex-col justify-center h-screen bg-neutral-400'>
            {/* TimerContainer */}
            <div className='bg-gradient-to-r from-yellow-600 to-amber-500 shadow-[0_4px_12px_-5px_rgba(0,0,0,0.4)] p-6 w-full max-w-sm rounded-xl   overflow-hidden mx-auto mt-4'>
                <h1 className='text-center text-4xl great-vibes-regular font-bold'>Count down timer</h1>

                {/* conatiner for input and button */}
                <div className='flex justify-evenly gap-4 m-3'>
                    <Input type='number' value={duration} onChange={handleInputChange} placeholder='Enter your timer duration into seconds' className='font-serif'/>
                <Button onClick={()=>countdownHandler()} className='bg-black text-white rounded great-vibes-regular text-2xl py-4' variant={'outline'}>Set</Button>
                </div>
                {/* Display formatted Time */}
                <div className='text-center text-4xl'>{fromatter(timeLeft)}</div>
                  {/* Buttons to start, pause, and reset the timer */}
                  <div className='flex justify-between gap-4 great-vibes-regular'>
                    <Button onClick={handlerStart} className='bg-black text-white rounded  text-2xl py-4' variant={'outline'}> {isPaused ? 'Reset' : 'Start'}</Button>
                    <Button onClick={handleReset} className='bg-black text-white rounded text-2xl py-4' variant={'outline'}>Reset</Button>
                    <Button onClick={handlePause} className='bg-black text-white rounded text-2xl py-4' variant={'outline'}>Pause</Button>
                  </div>
            </div>
        </div>
    )
} 
