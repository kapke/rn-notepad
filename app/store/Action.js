export const Action = type => {
    return Object.assign(
        (payload, meta, isError) => ({
            type,
            payload,
            meta,
            isError,
        }),
        { type },
    )
}
