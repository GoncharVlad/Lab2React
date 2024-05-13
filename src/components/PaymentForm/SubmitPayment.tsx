import React from "react";

interface PaymentButtonProps {
    paymentType: string,
    onPayment: () => void,
}

const SubmitPayment: React.FC<PaymentButtonProps> = ({ paymentType, onPayment }) => {
    const buttonImageSource = paymentType === 'mono'
        ? 'https://send.monobank.ua/img/mono_pay.svg'
        : 'https://www.gstatic.com/instantbuy/svg/dark_gpay.svg';

    const imageClasses = paymentType !== 'mono'
        ? 'w-[70px] h-[26px]'
        : '';

    const containerStyles = {
        height: '3rem',
        margin: '0 auto',
        minWidth: '21.25rem',
        borderRadius: '0.75rem',
        backgroundColor: '#000',
        overflow: 'hidden',
        cursor: 'pointer',
        marginBottom: '0.5rem',
        display: 'grid',
        placeItems: 'center',
    };

    return (
        <div
            style={containerStyles}
            onClick={onPayment}
        >
            <img src={buttonImageSource} alt="logo" className={imageClasses}/>
        </div>
    );
}

export default SubmitPayment;
