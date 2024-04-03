

export const isSameSenderMargin = (messages, m, i, userId) => {

    if (
        i < messages.length - 1 &&
        messages[i + 1].sender._id === m.sender._id &&
        messages[i].sender._id !== userId
    )
        return 40;
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

// export const isLastMessage = (messages, i, userId) => {
//     return (
//         i === messages.length - 1 &&
//         messages[messages.length - 1].sender._id !== userId &&
//         messages[messages.length - 1].sender._id
//     );
// };
export const isLastMessage = (messages, i, userId) => {
    return (
        // Check if the index is the last message in the array
        i === messages.length - 1 &&
        // Check if the sender of the last message is not the same as the specified userId
        messages[messages.length - 1].sender._id !== userId
    );
};

// export const isSameUser = (messages, m, i) => {
//     return i > 0 && messages[i - 1].sender._id === m.sender._id;
// };

export const isSameUser = (messages, m, i) => {
    // Check if the index is greater than 0 and if the sender of the previous message is the same as the sender of the current message
    return i > 0 && messages[i - 1].sender._id === m.sender._id;
};
export const getSender = (loggedUser, chatParticipants) => {
    if (chatParticipants && chatParticipants.length >= 2) {
        if (chatParticipants[0]._id === loggedUser?._id) {
            return chatParticipants[1].name;
        } else {
            return chatParticipants[0].name;
        }
    } else {
        return "Unknown Sender";
    }

};






// export const getSender = (loggedUser, users) => {
//     if (!Array.isArray(users) || users.length === 0) {
//         return null; // Handle case where users is not an array or is empty
//     }

//     const sender = users.find(user => user._id === loggedUser._id);
//     return sender ? sender.chatParticipant : null;
// };


// export const getFullSender = (loggedUser, users) => {
//     return users[0]._id === loggedUser._id ? users[1] : users[0];
// };
export const getFullSender = (loggedUser, users) => {
    // Check if users is an array and has at least two elements
    if (!Array.isArray(users) || users.length < 2) {
        return null; // Handle case where users is not an array or does not have at least two elements
    }

    // Check if the first user in the array has an _id property
    if (!users[0] || !users[0]._id) {
        return null; // Handle case where the first user is missing _id property
    }

    // Check if the second user in the array has an _id property
    if (!users[1] || !users[1]._id) {
        return null; // Handle case where the second user is missing _id property
    }

    // Return the second user if the _id of the first user matches the _id of the logged-in user, otherwise return the first user
    return users[0]._id === loggedUser._id ? users[1] : users[0];
};
