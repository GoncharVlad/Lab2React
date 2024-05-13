import React, { useReducer } from "react";
import PaymentCardInput from "./PaymentCardInput.tsx";
import CardDetailsForm from "./CardDetailsForm.tsx";

interface ManualPaymentProps {
    needClearing: boolean;
    toggleClearing: () => void;
    pay: () => void;
}

interface State {
    isManualActive: boolean;
    isCardNumberEntered: boolean;
    isCardDataEntered: boolean;
}

const initialState: State = {
    isManualActive: false,
    isCardNumberEntered: false,
    isCardDataEntered: false,
};

type Action =
    | { type: "TOGGLE_MANUAL_ACTIVE" }
    | { type: "TOGGLE_CARD_NUMBER_ENTERED" }
    | { type: "TOGGLE_CARD_DATA_ENTERED" }
    | { type: "RESET_CARD_DATA" };

const reducer = (state: State, action: Action): State => {
    switch (action.type) {
        case "TOGGLE_MANUAL_ACTIVE":
            return { ...state, isManualActive: !state.isManualActive };
        case "TOGGLE_CARD_NUMBER_ENTERED":
            return { ...state, isCardNumberEntered: !state.isCardNumberEntered };
        case "TOGGLE_CARD_DATA_ENTERED":
            return { ...state, isCardDataEntered: !state.isCardDataEntered };
        case "RESET_CARD_DATA":
            return { ...state, isCardDataEntered: false, isCardNumberEntered: false };
        default:
            return state;
    }
};

const ManualPaymentInput: React.FC<ManualPaymentProps> = (props) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const { isManualActive, isCardNumberEntered, isCardDataEntered } = state;

    const buttonDisabled = isCardNumberEntered && isCardDataEntered ? " bg-orange-500 cursor-pointer" : " bg-orange-300 cursor-not-allowed";
    const buttonClasses = `rounded-2xl p-0 b-0 mx-auto h-[56px] font-bold text-lg mb-[42px] text-white min-w-[340px] text-center flex items-center justify-center${buttonDisabled}`;

    const handleClick = () => {
        props.pay();
        props.toggleClearing();
        if (props.needClearing) {
            dispatch({ type: "RESET_CARD_DATA" });
        }
    };

    return (
        <div className="mx-6 box-border max-w-[340px] mb-10 flex flex-col w-full">
            {!isManualActive && (
                <>
                    <div className="border-t-[0.5px] border-controlsBorderCol mt-6 mb-2"></div>
                    <div
                        className="text-center p-2 cursor-pointer bg-transparent flex font-normal text-md
                    justify-center w-full box-border transition-all rounded-lg text-manualPaymentCol items-center"
                        onClick={() => dispatch({ type: "TOGGLE_MANUAL_ACTIVE" })}
                    >
                        <img src="https://send.monobank.ua/img/card.svg" alt="card" className="w-4 h-6 mr-2" />
                        <p className="font-normal text-md text-center">Оплатити карткою</p>
                    </div>
                </>
            )}
            {isManualActive && (
                <>
                    <div className="w-[346px] flex items-center mb-6 mx-auto font-normal text-md">
                        <div className="border-t-controlsBorderCol border-[0.5px] flex-grow"></div>
                        <div className="px-4 py-0">або уведіть дані карти</div>
                        <div className="border-t-controlsBorderCol border-[0.5px] flex-grow"></div>
                    </div>
                    <PaymentCardInput
                        needClearing={props.needClearing}
                        placeholder={"Номер картки"}
                        toggleCardNum={() => dispatch({ type: "TOGGLE_CARD_NUMBER_ENTERED" })}
                    />
                    <CardDetailsForm
                        needClearing={props.needClearing}
                        toggleCardData={() => dispatch({ type: "TOGGLE_CARD_DATA_ENTERED" })}
                    />
                    <button disabled={!isCardNumberEntered || !isCardDataEntered} className={buttonClasses} onClick={handleClick}>
                        Поповнити банку
                    </button>
                </>
            )}
        </div>
    );
};

export default ManualPaymentInput;
