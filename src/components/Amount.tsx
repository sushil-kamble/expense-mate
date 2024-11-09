interface AmountProps {
    amount: number | string;
    className?: string;
    showDecimals?: boolean;
}

const Amount: React.FC<AmountProps> = ({
    amount,
    className = '',
    showDecimals = false,
}) => {
    const numericAmount = Number(amount);

    const amountToFormat = showDecimals
        ? numericAmount
        : Math.round(numericAmount);

    const formattedAmount = new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        minimumFractionDigits: showDecimals ? 2 : 0,
        maximumFractionDigits: showDecimals ? 2 : 0,
    }).format(amountToFormat);

    return <span className={className}>{formattedAmount}</span>;
};

export default Amount;
