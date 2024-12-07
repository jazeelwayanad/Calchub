import React, { useState, useEffect } from 'react';
import { Calculator } from '../../components/Calculator';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { Result } from '../../components/Result';
import { useWindowSize } from 'react-use';
import confetti from 'react-confetti';

export function CountdownTimer() {
  const [eventName, setEventName] = useState<string>('');
  const [eventDate, setEventDate] = useState<string>('');
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  } | null>(null);
  const [isComplete, setIsComplete] = useState(false);
  const { width, height } = useWindowSize();

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (eventDate) {
      timer = setInterval(() => {
        const now = new Date().getTime();
        const target = new Date(eventDate).getTime();
        const difference = target - now;

        if (difference <= 0) {
          setIsComplete(true);
          setTimeLeft(null);
          clearInterval(timer);
        } else {
          setTimeLeft({
            days: Math.floor(difference / (1000 * 60 * 60 * 24)),
            hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
            minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
            seconds: Math.floor((difference % (1000 * 60)) / 1000),
          });
        }
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [eventDate]);

  const handleStart = () => {
    setIsComplete(false);
    const now = new Date().getTime();
    const target = new Date(eventDate).getTime();
    
    if (target > now) {
      const difference = target - now;
      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((difference % (1000 * 60)) / 1000),
      });
    }
  };

  return (
    <Calculator
      title="Countdown Timer"
      description="Create a countdown to your important events and celebrations."
    >
      {isComplete && <confetti width={width} height={height} />}
      
      <div className="space-y-6">
        <div className="space-y-4">
          <Input
            label="Event Name"
            type="text"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
            placeholder="Enter event name"
          />
          <Input
            label="Event Date and Time"
            type="datetime-local"
            value={eventDate}
            onChange={(e) => setEventDate(e.target.value)}
            min={new Date().toISOString().slice(0, 16)}
          />

          <Button onClick={handleStart} className="w-full">
            Start Countdown
          </Button>
        </div>

        {timeLeft && (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Time until {eventName || 'event'}:
              </h3>
            </div>

            <div className="grid grid-cols-4 gap-4">
              <Result
                label="Days"
                value={timeLeft.days}
              />
              <Result
                label="Hours"
                value={timeLeft.hours}
              />
              <Result
                label="Minutes"
                value={timeLeft.minutes}
              />
              <Result
                label="Seconds"
                value={timeLeft.seconds}
              />
            </div>

            {timeLeft.days === 0 && timeLeft.hours === 0 && timeLeft.minutes < 60 && (
              <div className="bg-yellow-50 rounded-lg p-4 text-center">
                <p className="text-yellow-800 font-medium">
                  Almost there! Less than {timeLeft.minutes + 1} minutes to go!
                </p>
              </div>
            )}
          </div>
        )}

        {isComplete && (
          <div className="bg-green-50 rounded-lg p-6 text-center">
            <h3 className="text-2xl font-bold text-green-900 mb-2">
              🎉 {eventName || 'Event'} Time! 🎉
            </h3>
            <p className="text-green-800">
              The countdown is complete! Time to celebrate!
            </p>
          </div>
        )}
      </div>
    </Calculator>
  );
}