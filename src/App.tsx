import { useEffect } from 'react';
import { LeftPart } from "./components/Sidebar/LeftPart.tsx";
import { RightPart } from './components/Sidebar/RightPart.tsx';
import { FooterSection } from './components/FooterSection/FooterSection.tsx';
import { BalanceProps } from './models/models';


function FundraisingSection() {
    return (
        <div className="bg-white rounded-3xl flex my-4 min-w-[990px] min-h-[680px]">
            <LeftPart />
            <RightPart />
        </div>
    );
}

function App() {
    useEffect(() => {
        const initBalanceProps: BalanceProps = {
            collected: 0,
            goal: 32000
        };

        localStorage.setItem('balance', JSON.stringify(initBalanceProps));
    }, []);

    return (
        <div className="h-screen w-screen flex flex-col justify-center items-center bg-gradient-to-br from-firstBodyGradientCol to-secondBodyGradientCol">
            <FundraisingSection />
            <FooterSection />
        </div>
    );
}

export default App;
