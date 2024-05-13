import React, { useState, useEffect, FormEvent } from "react";

interface CreditCardFormProps {
    toggleCardData: () => void;
    needClearing: boolean;
}

interface FormData {
    expirationMonth: string;
    expirationYear: string;
    cvc2: string;
}

const CardDetailsForm: React.FC<CreditCardFormProps> = ({
                                                           toggleCardData,
                                                           needClearing,
                                                       }) => {
    const [inputData, setInputData] = useState<FormData>({
        expirationMonth: '',
        expirationYear: '',
        cvc2: ''
    });

    useEffect(() => {
        if (
            inputData.expirationMonth &&
            inputData.expirationYear &&
            inputData.cvc2 &&
            inputData.cvc2.length === 3
        )
            toggleCardData();
    }, [inputData, toggleCardData]);

    useEffect(() => {
        if (needClearing)
            setInputData({
                expirationMonth: '',
                expirationYear: '',
                cvc2: ''
            });
    }, [needClearing]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        switch (name) {
            case "expirationMonth":
                if (value.length <= 2) setInputData({ ...inputData, [name]: value });
                break;
            case "expirationYear":
                if (value.length <= 4) setInputData({ ...inputData, [name]: value });
                break;
            case "cvc2":
                if (value.length <= 3) setInputData({ ...inputData, [name]: value });
                break;
            default:
                break;
        }
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData: FormData = {
            expirationMonth: inputData.expirationMonth,
            expirationYear: inputData.expirationYear,
            cvc2: inputData.cvc2
        };
        console.log(formData);
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="grid grid-cols-3 gap-2 max-w-[340px] w-full mx-auto mb-4 border-controlsBorderCol border border-solid rounded-2xl bg-transparent py-0 px-4 h-[56px]"
        >
            <div className="flex w-[90px] min-h-[54px] pb-2">
                <div className="group">
                    <input
                        type="tel"
                        inputMode="decimal"
                        pattern="\d*"
                        autoComplete="cc-exp-month"
                        name="expirationMonth"
                        value={inputData.expirationMonth}
                        onChange={handleInputChange}
                        className="bg-none text-left text-black h-[41px] w-full text-lg rounded-none mt-3 box-border p-0 outline-none"
                        maxLength={2}
                    />
                    <label className={inputData.expirationMonth ? "cursor-default text-left text-[#757575] transition-all ease-linear relative top-[-52px] group-hover:text-sm select-none pb-2" : "cursor-default text-left text-[#757575] transition-all ease-linear relative top-[-38px] group-hover:top-[-52px] group-hover:text-sm select-none pb-2"}>
                        Month
                    </label>
                </div>
                <span className="text-center opacity-[0.2] w-[1px] bg-dividingCol m-auto h-[40px] -left-4 top-0 mt-2"></span>
            </div>
            <div className="flex w-[90px] min-h-[54px] pb-2">
                <div className="group">
                    <input
                        type="tel"
                        inputMode="decimal"
                        pattern="\d*"
                        autoComplete="cc-exp-year"
                        name="expirationYear"
                        value={inputData.expirationYear}
                        onChange={handleInputChange}
                        className="bg-none text-left text-black h-[41px] w-full text-lg rounded-none mt-3 box-border p-0 outline-none"
                        maxLength={4}
                    />
                    <label className={inputData.expirationYear ? "cursor-default text-left text-[#757575] transition-all ease-linear relative top-[-52px] group-hover:text-sm select-none pb-2" : "cursor-default text-left text-[#757575] transition-all ease-linear relative top-[-38px] group-hover:top-[-52px] group-hover:text-sm select-none pb-2"}>
                        Year
                    </label>
                </div>
                <span className="text-center opacity-[0.2] w-[1px] bg-dividingCol m-auto h-[40px] -left-4 top-0 mt-2"></span>
            </div>
            <div className="w-[90px] min-h-[54px] group">
                <input
                    type="tel"
                    inputMode="decimal"
                    pattern="\d*"
                    autoComplete="cc-csc"
                    name="cvc2"
                    value={inputData.cvc2}
                    onChange={handleInputChange}
                    className="bg-none text-left border-0 text-black h-[41px] w-full text-lg rounded-none mt-3 box-border p-0 outline-none"
                    maxLength={3}
                />
                <label className={inputData.cvc2 ? "cursor-default text-left text-[#757575] transition-all ease-linear relative top-[-52px] group-hover:text-sm select-none pb-2" : "cursor-default text-left text-[#757575] transition-all ease-linear relative top-[-38px] group-hover:top-[-52px] group-hover:text-sm select-none pb-2"}>
                    CVC2
                </label>
            </div>
        </form>
    );
};

export default CardDetailsForm;
