// export const getSender = (loggedUser, chatParticipants) => {
//     // return chatParticipants.find(p => p !== loggedUser);
//     return chatParticipants[0] === loggedUser._id ? chatParticipants[1].name : chatParticipants[0].name;
// };
// export const getSender = (loggedUser, chatParticipants) => {
//     if (!Array.isArray(chatParticipants) || chatParticipants.length === 0) {
//         return null; // Handle case where chatParticipants is not an array or is empty
//     }

//     const senderId = chatParticipants[0].chatParticipants.find(id => id !== loggedUser._id);
//     const sender = chatParticipants[0].chatParticipants.find(participant => participant._id === senderId);

//     return sender ? sender.name : null; // Return the sender's name if found, or null otherwise
// };
//


// export const getFullSender = (loggedUser, chatParticipants) => {
//     // return chatParticipants.find(p => p !== loggedUser);
//     return chatParticipants[0] === loggedUser._id ? chatParticipants[1] : chatParticipants[0];
// };
// export const getFullSender = (loggedUser, chatParticipants) => {
//     if (!Array.isArray(chatParticipants) || chatParticipants.length === 0) {
//         return null; // Handle case where chatParticipants is not an array or is empty
//     }

//     const senderId = chatParticipants.find(id => id !== loggedUser._id);
//     const sender = chatParticipants.find(participant => participant._id === senderId);

//     return sender || null; // Return the sender object if found, or null otherwise
// };

export const isSameSenderMargin = (messages, m, i, userId) => {
    // console.log(i === messages.length - 1);

    if (
        i < messages.length - 1 &&
        messages[i + 1].sender._id === m.sender._id &&
        messages[i].sender._id !== userId
    )
        return 33;
    else if (
        (i < messages.length - 1 &&
            messages[i + 1].sender._id !== m.sender._id &&
            messages[i].sender._id !== userId) ||
        (i === messages.length - 1 && messages[i].sender._id !== userId)
    )
        return 0;
    else return "auto";
};

export const isSameSender = (messages, m, i, userId) => {
    return (
        i < messages.length - 1 &&
        (messages[i + 1].sender._id !== m.sender._id ||
            messages[i + 1].sender._id === undefined) &&
        messages[i].sender._id !== userId
    );
};

export const isLastMessage = (messages, i, userId) => {
    return (
        i === messages.length - 1 &&
        messages[messages.length - 1].sender._id !== userId &&
        messages[messages.length - 1].sender._id
    );
};

export const isSameUser = (messages, m, i) => {
    return i > 0 && messages[i - 1].sender._id === m.sender._id;
};

export const getSender = (loggedUser, users) => {
    return users[0]?._id === loggedUser?._id ? users[1].name : users[0].name;
};

export const getFullSender = (loggedUser, users) => {
    return users[0]._id === loggedUser._id ? users[1] : users[0];
};