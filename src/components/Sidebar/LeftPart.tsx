import  { Component } from "react";
import { BinElement } from "./BinElement.tsx";

interface StatisticProps {
    isRightSide: boolean;
}

class Statistic extends Component<StatisticProps> {
    state = {
        balance: { goal: 0, collected: 0 },
        sum: this.props.isRightSide ? 0 : 0,
    };

    logoUrl = this.props.isRightSide ? "https://send.monobank.ua/img/target.svg" : "https://send.monobank.ua/img/collected.svg";
    rightBorderClass = this.props.isRightSide ? "" : "pr-5 border-r border-dividingCol border-opacity-70";
    label = this.props.isRightSide ? "Ціль" : "Накопичено";

    updateBalance = () => {
        const updatedBalance = JSON.parse(localStorage.getItem('balance') || '{ "goal": 0, "collected": 0 }');
        this.setState({ balance: updatedBalance }, () => {
            this.updateSum();
        });
    };

    updateSum = () => {
        const { balance } = this.state;
        const { isRightSide } = this.props;
        const sum = isRightSide ? balance.goal : balance.collected;
        this.setState({ sum });
    };

    componentDidMount() {
        this.updateBalance();
        window.addEventListener('balanceUpdated', this.handleBalanceUpdate);
    }

    componentWillUnmount() {
        window.removeEventListener('balanceUpdated', this.handleBalanceUpdate);
    }

    handleBalanceUpdate = () => {
        this.updateBalance();
    };

    componentDidUpdate(prevProps: StatisticProps) {
        if (prevProps.isRightSide !== this.props.isRightSide) {
            this.updateSum();
        }
    }

    render() {
        return (
            <div className="flex relative py-0 px-5 my-3 mx-0 items-center w-1/2">
                <img
                    src={this.logoUrl}
                    alt="svg-logo"
                    className="w-6 h-6 mr-4 min-w-6"
                />
                <div className={`flex flex-col ${this.rightBorderClass}`}>
                    <div className="font-semibold text-md text-statsTextColor">{this.label}</div>
                    <div className="font-semibold text-lg text-black">{this.state.sum} ₴</div>
                </div>
            </div>
        );
    }
}

export class LeftPart extends Component {
    render() {
        return (
            <div className="w-1/2 bg-[#f3f4f6] rounded-l-3xl flex flex-col items-center justify-evenly">
                <img
                    src="https://send.monobank.ua/img/logo_short.svg"
                    alt="logo"
                    className="mx-auto mt-[42px] mb-6"
                />
                <BinElement />
                <div className="text-center text-black leading-4 mt-1 font-normal text-md">Артем К. збирає
                </div>
                <div className="text-[22px] text-center mt-1 font-extrabold">На ремонт медеваку</div>
                <div className="flex-col items-center justify-center mb-auto mt-1 min-w-[340px] flex">
                    <div className="text-md font-normal mt-2 text-center mx-auto mb-0 text-black">
                        Збираємо на ремонт медеваку для 4ОТБР танкова бригада<br /> Ремонтуємо 2 автівки - Тойоту та Нісан.<br />У бригаді є наші земляки з Черкащини!<br />Ремонт авто треба на вчора! Прохання підтримати!
                    </div>
                    <div className="text-left justify-center mt-4 bg-white flex rounded-2xl mx-auto my-0">
                        <Statistic isRightSide={false} />
                        <Statistic isRightSide={true} />
                    </div>
                </div>
            </div>
        );
    }
}
