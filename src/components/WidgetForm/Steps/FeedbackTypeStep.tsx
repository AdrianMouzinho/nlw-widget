import { FeedbackType, feedbackTypes } from "..";
import { CloseButton } from "../../CloseButton";

interface FeedbackTypeStepProps {
    onFeedbackTypeChanged: (type: FeedbackType) => void;
};

export function FeedbackTypeStep({ onFeedbackTypeChanged }: FeedbackTypeStepProps) {
    return (
        <>
            <header className="relative w-full flex justify-center text-xl leading-6">
                Deixe seu feedback
                <CloseButton />
            </header>

            <div className="w-full flex justify-center gap-2 mt-8 mb-12">
                { Object.entries(feedbackTypes).map(([key, value]) => {
                    return (
                        <button
                            key={key}
                            className="bg-zinc-800 rounded-lg w-24 py-5 flex-1 flex flex-col justify-center items-center gap-2 border-2 border-transparent hover:border-brand-500 focus:border-brand-500 outline-none text-sm"
                            type="button"
                            onClick={() => onFeedbackTypeChanged(key as FeedbackType)}
                        >
                            <img src={value.image.src} alt={value.image.alt} />
                            {value.title}
                        </button>
                    )
                })}
            </div>
        </>
    );
}