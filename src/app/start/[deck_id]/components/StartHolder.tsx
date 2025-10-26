import {Card} from "@/app/lib/types";
import WordIntroduction from "@/app/start/[deck_id]/components/WordIntroduction";
import CardMeaningTest from "@/app/start/[deck_id]/components/CardMeaningTest";
import CardWordTest from "@/app/start/[deck_id]/components/CardWordTest";
import CardInfoHolder from "@/app/components/CardInfoHolder";
import MultiChoice from "@/app/start/[deck_id]/components/MultiChoice";
import CardsDataHolder from "@/app/start/[deck_id]/components/CardsDataHolder";
import FormSwitcher from "@/app/components/FormSwitcher";
import {nanoid} from "nanoid";

interface StartHolderProps {
    cards: Card[]
}


export default function StartHolder({ cards }: StartHolderProps){


    // each card has its own test passed on its mark
    const testForACard = cards.map(card =>  {
        if(card.mark === 0){
            return <WordIntroduction key={card.card_id} card={card} />
        }else if(card.mark === 5){
            return (
                <CardsDataHolder cards={cards} key={nanoid()}>
                    <MultiChoice rightChoice={card} key={nanoid()}></MultiChoice>
                </CardsDataHolder>
            )
        }else if(card.mark === 10){
            return <CardMeaningTest key={card.card_id} card={card}></CardMeaningTest>
        }else if(card.mark === 15){
            return(
                    <CardWordTest key={card.card_id} card={card}></CardWordTest>
            )
        }

        else {
            <h1 key={card.card_id}>{ card.mark }</h1>
        }
    })




    return (
        <div className={'mt-14 h-screen w-screen'}>
            <FormSwitcher>
                {testForACard}
            </FormSwitcher>
        </div>
    )
}
