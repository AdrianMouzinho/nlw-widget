import { ArrowLeft } from "phosphor-react";
import { FormEvent, useState } from "react";
import { FeedbackType, feedbackTypes } from "..";
import { api } from "../../../services/api";
import { CloseButton } from "../../CloseButton";
import { Loading } from "../../Loading";
import { ScreenshotButton } from "../ScreenshotButton";

interface FeedbackContentStepProps {
    feedbackType: FeedbackType;
    onFeedbackRestartRequested: () => void;
    onFeedbackSent: () => void;
}

export function FeedbackContentStep({ feedbackType, onFeedbackRestartRequested, onFeedbackSent }: FeedbackContentStepProps) {
    const [screenshot, setScreenshot] = useState<string | null>(null);
    const [comment, setComment] = useState('');
    const [isSending, setIsSending] = useState(false);

    const feedbackTypeInfo = feedbackTypes[feedbackType];

    async function handleSubmitFeedback(event: FormEvent) {
        event.preventDefault();

        setIsSending(true);

        await api.post("/feedbacks", {
            type: feedbackType,
            comment,
            screenshot
        });

        setIsSending(false);

        onFeedbackSent();
    }

    return (
        <>
            <header className="relative w-full flex justify-center text-xl leading-6">
                <button 
                    type="button"
                    className="absolute left-0 p-1 text-zinc-400 hover:text-zinc-100"
                    onClick={() => onFeedbackRestartRequested()}
                >
                    <ArrowLeft size="16" weight="bold"/>
                </button>

                <span className="flex items-center gap-2">
                    <img 
                        className="w-6 h-6"
                        src={feedbackTypeInfo.image.src}
                        alt={feedbackTypeInfo.image.alt} 
                    />
                    {feedbackTypeInfo.title}
                </span>
                <CloseButton />
            </header>

            <form onSubmit={handleSubmitFeedback} className="flex flex-col justify-center gap-2 my-4 w-full">
                <textarea 
                    className="md:min-w-[304px] w-full min-h-[112px] text-sm placeholder-zinc-400 text-zinc-100 border-zinc-600 bg-transparent rounded-md focus:border-brand-500 focus:ring-brand-500 focus:ring-1 focus:outline-none resize-none scrollbar scrollbar-thumb-zinc-700 scrollbar-track-transparent scrollbar-w-2"
                    placeholder={feedbackTypeInfo.placeholder}
                    onChange={event => setComment(event.target.value)}
                />

                <div className="flex gap-2">
                    <ScreenshotButton 
                        screenshot={screenshot}
                        onScreenshotTook={setScreenshot}
                    />

                    <button
                        type="submit"
                        disabled={comment ? false : true}
                        className="p-2 bg-brand-500 hover:bg-brand-400 text-zinc-100 border-transparent rounded-md flex justify-center items-center text-sm leading-6 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-brand-500 flex-1 transition-colors disabled:opacity-50 disabled:hover:bg-brand-500"
                    >
                        { isSending ? <Loading /> : 'Enviar'}
                    </button>
                </div>
            </form>
        </>
    );
}