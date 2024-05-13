import React, { useEffect, useState } from "react";
import { BalanceProps } from "../../models/models.ts";

interface IJarUrls {
    [key: string]: string;
}

const jarUrls: IJarUrls = {
    "0": 'https://send.monobank.ua/img/jar/0.png',
    "33": 'https://send.monobank.ua/img/jar/uah_33.png',
    "50": 'https://send.monobank.ua/img/jar/uah_50.png',
    "100": 'https://send.monobank.ua/img/jar/uah_100.png',
};

export const BinElement: React.FC = () => {
    const [balance, setBalance] = useState<BalanceProps>({ collected: 0, goal: 0 });
    const [currJarUrl, setCurrJarUrl] = useState<string>(jarUrls["0"]);

    const handleBalanceUpdate = () => {
        const storedBalance = JSON.parse(localStorage.getItem('balance') || '{}');
        setBalance({
            collected: storedBalance.collected || 0,
            goal: storedBalance.goal || 0
        });
    };

    useEffect(() => {
        handleBalanceUpdate();
        window.addEventListener('balanceUpdated', handleBalanceUpdate);

        return () => {
            window.removeEventListener('balanceUpdated', handleBalanceUpdate);
        };
    }, []);

    useEffect(() => {
        const percentage: number = (balance.collected / balance.goal) * 100;

        if (percentage > 0 && percentage < 33) {
            setCurrJarUrl(jarUrls["0"]);
        } else if (percentage >= 33 && percentage < 50) {
            setCurrJarUrl(jarUrls["33"]);
        } else if (percentage >= 50 && percentage < 100) {
            setCurrJarUrl(jarUrls["50"]);
        } else if (percentage >= 100) {
            setCurrJarUrl(jarUrls["100"]);
        }
    }, [balance]);

    return (
        <div className="w-auto h-fit mt-auto mb-5">
            <div className="relative">
                <img
                    src="https://send.monobank.ua/img/jar_bg.png"
                    alt="jar-bg"
                    className="w-[215px] h-[215px]"
                />
                <div className="scale-95 translate-x-[-50%] translate-y-[-50%] origin-center absolute top-1/2 left-1/2 transform">
                    <img
                        src={currJarUrl}
                        alt="jar"
                        className="max-w-none h-[205px]"
                    />
                    <div className="absolute top-[26px] left-[13px]">
                        <img alt="grid" className="w-[42px] h-[168px]" src="https://send.monobank.ua/img/jar/grid.png"/>
                        <div className="font-bold text-[10px] text-gridTextCol whitespace-nowrap absolute bottom-[150px] left-[16px]">
                            {balance.goal}
                        </div>
                        <div className="left-[5px] font-bold text-[10px] absolute bottom-[78px] text-gridTextCol whitespace-nowrap">
                            {balance.goal / 2}
                        </div>
                        <div className="left-[7px] font-bold text-[10px] text-gridTextCol absolute bottom-[2px] whitespace-nowrap">
                            0
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
