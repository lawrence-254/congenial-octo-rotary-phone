export const getSender = (loggedUser, chatParticipants) => {
    // return chatParticipants.find(p => p !== loggedUser);
    return chatParticipants[0] === loggedUser._id ? chatParticipants[1].name : chatParticipants[0].name;
};
export const getFullSender = (loggedUser, chatParticipants) => {
    // return chatParticipants.find(p => p !== loggedUser);
    return chatParticipants[0] === loggedUser._id ? chatParticipants[1] : chatParticipants[0];
};