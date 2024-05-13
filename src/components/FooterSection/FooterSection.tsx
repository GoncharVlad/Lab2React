
export function FooterSection() {
    const bankInfo = (
        <>
            АТ «УНІВЕРСАЛ БАНК» Ліцензія НБУ №92 від
            <br />
            20.01.1994, у держреєстрі банків №226
        </>
    );

    const drawButton = (
        <div className="border-white border-[0.5px] rounded-xl py-2 px-4 flex items-center justify-evenly cursor-pointer hover:bg-gray-100 hover:bg-opacity-20">
            <img
                src="https://send.monobank.ua/img/cup.svg"
                alt="cup"
                className="mr-2 z-20"
            />
            <span className="text-white text-md z-20">Провести розіграш</span>
        </div>
    );

    const widgetButton = (
        <div className="border-[0.5px] rounded-xl py-2 px-4 hover:bg-gray-100 hover:bg-opacity-20 flex items-center justify-evenly cursor-pointer border-white">
            <img
                src="https://send.monobank.ua/img/gamepad.svg"
                alt="cup"
                className="mr-2 z-20"
            />
            <span className="text-white text-md z-20">Віджет для стрімів</span>
        </div>
    );

    return (
        <div className="items-center text-white z-10 flex min-w-[990px] mb-4 justify-between">
            <div className="opacity-50">{bankInfo}</div>
            <div className="w-[400px] flex items-center justify-evenly">
                {drawButton}
                {widgetButton}
            </div>
        </div>
    );
}
