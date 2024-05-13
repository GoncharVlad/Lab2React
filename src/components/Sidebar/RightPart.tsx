import InputField from "../InputFields/InputField.tsx";
import SubmitPayment from "../PaymentForm/SubmitPayment.tsx";
import { useEffect, useState } from "react";
import { BalanceProps } from "../../models/models.ts";
import ManualPaymentInput from "../PaymentForm/ManualPaymentInput.tsx";
import IncrementButton from "../Counter/IncrementButton.tsx";


const useInput = (initialValue: string, validation: (value: string) => boolean) => {
    const [value, setValue] = useState<string>(initialValue);
    const [isValid, setIsValid] = useState<boolean>(true);

    const validate = () => {
        setIsValid(validation(value));
    };

    useEffect(() => {
        validate();
    }, [value, validation]);

    return { value, setValue, isValid, validate };
};

export function RightPart() {
    const [needClearing, setNeedClearing] = useState<boolean>(false);
    const [needClearingManual, setNeedClearingManual] = useState<boolean>(false);
    const [balance, setBalance] = useState<BalanceProps>(() => {
        const storedBalance = JSON.parse(localStorage.getItem('balance') || '{}');
        return { collected: storedBalance.collected || 0, goal: storedBalance.goal || 0 };
    });


    const { value: inputValue, setValue: setInputValue, isValid: isInputValid, validate: validateInput } = useInput('', (value) => {
        if (!value) return true;
        const currInputValue = parseInt(value);
        return currInputValue >= 10 && currInputValue <= 29999;
    });

    const debouncedInput = useDebounce(inputValue, 300);

    const updateInputValue = (value: number) => {
        setInputValue((prev: string) => !prev ? String(value) : String(parseInt(prev) + value));
    };

    const handlePayment = () => {
        if (isInputValid && inputValue) {
            const updatedBalance: BalanceProps = {
                collected: balance.collected + parseInt(inputValue),
                goal: balance.goal
            };
            setBalance(updatedBalance);
            setInputValue('');
            toggleNeedClearing();
            toggleNeedClearingManual();
        }
    };

    const toggleNeedClearing = () => {
        setNeedClearing((prev: boolean) => !prev);
    };

    const toggleNeedClearingManual = () => {
        setNeedClearingManual((prev: boolean) => !prev);
    };

    useEffect(() => {
        validateInput();
    }, [debouncedInput, validateInput]);

    useEffect(() => {
        localStorage.setItem('balance', JSON.stringify(balance));
        window.dispatchEvent(new Event('balanceUpdated'));
    }, [balance, validateInput]);

    return (
        <div className="min-h-[620px] flex flex-col items-center justify-center w-1/2 bg-white rounded-r-3xl relative">
            <div className="bg-gradient-to-r from-firstCardGradientCol to-secondCardGradientCol p-[3px] w-fit rounded-3xl mt-[42px] mb-8 h-max">
                <div className="bg-white flex flex-col justify-center min-w-[394px] rounded-3xl min-h-[163px] p-6">
                    <div className="text-center leading-4 mt-0 flex justify-center items-center font-semibold text-md">
                        <span>Сума поповнення</span>
                        <img src="https://send.monobank.ua/img/money.png" alt="money" className="w-4 ml-[0.5em] mb-[-3px]"/>
                    </div>
                    <div className={`font-extrabold text-5xl text-center py-5 px-0 opacity-[0.4] flex justify-center items-center transition-opacity ${isInputValid ? "" : "text-red-500"}`}>
                        <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                            <input
                                type="text"
                                inputMode="numeric"
                                pattern="\d*"
                                value={inputValue}
                                className={`placeholder-gray-950 appearance-none outline-none p-0 w-36 text-right ${isInputValid ? "" : "placeholder-red-500"}`}
                                style={{ width: inputValue.length > 0 ? `${inputValue.length * 1.5 + 2}rem` : '2rem' }}
                                placeholder={"0"}
                                onChange={(e) => {
                                    let newValue = parseInt(e.target.value) || 0;
                                    newValue = Math.min(newValue, 29999);
                                    setInputValue(String(newValue));
                                }}
                            />
                        </div>
                        <div className="text-center">&nbsp;₴</div>
                    </div>
                    {!isInputValid && <span className="text-center text-sm -mt-4 mb-2">Сума повинна бути від 10 до 29999</span>}
                    <div className="flex items-center justify-evenly">
                        <IncrementButton value={100} handleIncrement={updateInputValue} />
                        <IncrementButton value={500} handleIncrement={updateInputValue} />
                        <IncrementButton value={1_000} handleIncrement={updateInputValue} />
                    </div>
                </div>
            </div>
            <InputField inputType="text" placeholder="Ваше ім'я" maxInputLength={20} isNeedClearing={needClearing} toggleNeedClearing={toggleNeedClearing} />
            <InputField inputType="text" placeholder="Коментар" maxInputLength={35} isNeedClearing={needClearing} toggleNeedClearing={toggleNeedClearing} />
            <SubmitPayment paymentType="mono" onPayment={handlePayment} />
            <SubmitPayment paymentType="gPay" onPayment={handlePayment} />
            <ManualPaymentInput needClearing={needClearingManual} toggleClearing={toggleNeedClearingManual} pay={handlePayment} />
        </div>
    );
}
export function useDebounce(value: string, delay: number): string {
    const [debounced, setDebounced] = useState(value);

    const updateDebouncedValue = () => {
        const handler = setTimeout(() => setDebounced(value), delay);
        return () => clearTimeout(handler);
    };

    useEffect(updateDebouncedValue, [value, delay]);

    return debounced;
}
