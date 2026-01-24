import ConfirmDialog from "~/components/ConfirmDialog.vue"

export interface ConfirmOptions {
    title: string
    description?: string
}

export const useConfirmDialog = () => {
    const overlay = useOverlay();

    return (options: ConfirmOptions): Promise<boolean> => {
        const modal = overlay.create(ConfirmDialog, {
            props: options
        });

        return modal.open();
    }
}