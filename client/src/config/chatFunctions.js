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
export const getSender = (loggedUser, chatParticipants) => {
    if (!Array.isArray(chatParticipants) || chatParticipants.length === 0) {
        return null; // Handle case where chatParticipants is not an array or is empty
    }

    const senderId = chatParticipants.find(id => id !== loggedUser._id);
    const sender = chatParticipants.find(participant => participant._id === senderId);

    return sender ? sender.name : null; // Return the sender's name if found, or null otherwise
};


// export const getFullSender = (loggedUser, chatParticipants) => {
//     // return chatParticipants.find(p => p !== loggedUser);
//     return chatParticipants[0] === loggedUser._id ? chatParticipants[1] : chatParticipants[0];
// };
export const getFullSender = (loggedUser, chatParticipants) => {
    if (!Array.isArray(chatParticipants) || chatParticipants.length === 0) {
        return null; // Handle case where chatParticipants is not an array or is empty
    }

    const senderId = chatParticipants.find(id => id !== loggedUser._id);
    const sender = chatParticipants.find(participant => participant._id === senderId);

    return sender || null; // Return the sender object if found, or null otherwise
};

