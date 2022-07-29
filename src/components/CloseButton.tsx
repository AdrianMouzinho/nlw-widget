import { Popover } from "@headlessui/react";
import { X } from "phosphor-react";

export function CloseButton() {
    return (
        <Popover.Button className="absolute right-0 p-1 text-zinc-400 hover:text-zinc-100" title="Fechar formulário de feedback">
            <X size="16" weight="bold" />
        </Popover.Button>
    )
}