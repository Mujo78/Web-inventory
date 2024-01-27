import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import chatServices from "./chatService";

export type MessageType = {
  _id: string;
  content: string;
  senderId: string;
  receiverId: string;
  isRead: boolean;
  createdAt: Date;
  inboxId: string;
};

export type lastMessageType = {
  senderId: string;
  content: string;
  isRead: boolean;
  createdAt: Date;
};

export type UserDataType = {
  _id: string;
  username: string;
  status: "away" | "busy" | "offline" | "online" | undefined;
};

export type SelectedInboxType = {
  _id: string;
  deletedBy: string;
  participant: UserDataType;
};

export type InboxType = {
  _id: string;
  deletedBy: string;
  lastMessage: lastMessageType;
  participant: UserDataType;
};

type LastMessagesType = Record<string, lastMessageType>;

type InitialStateType = {
  messages: MessageType[];
  inbox: InboxType[];
  selectedInbox?: SelectedInboxType;
  lastMessagesState: LastMessagesType;
  status: "start" | "idle" | "loading" | "failed";
  message: string;
};

const initialState: InitialStateType = {
  messages: [],
  inbox: [],
  lastMessagesState: {},
  status: "start",
  message: "",
};

export const getMyInbox = createAsyncThunk<
  InboxType[],
  undefined,
  { state: RootState }
>("chat/inbox", async (_, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.accessUser?.accessToken as string;
    const safeToken = token || "";
    return await chatServices.getInboxes(safeToken);
  } catch (error: any) {
    const message = error.response;

    return thunkAPI.rejectWithValue(message);
  }
});

export const getInboxById = createAsyncThunk<
  InboxType,
  { inboxId: string },
  { state: RootState }
>("chat/selected-inbox", async ({ inboxId }, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.accessUser?.accessToken as string;
    const safeToken = token || "";
    return await chatServices.getInboxById(safeToken, inboxId);
  } catch (error: any) {
    const message = error.response;

    return thunkAPI.rejectWithValue(message);
  }
});

export const getInboxChatHistory = createAsyncThunk<
  MessageType[],
  { inboxId: string },
  { state: RootState }
>("chat/inbox-history", async ({ inboxId }, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.accessUser?.accessToken as string;
    const safeToken = token || "";
    return await chatServices.getInboxChat(safeToken, inboxId);
  } catch (error: any) {
    const message = error.response;

    return thunkAPI.rejectWithValue(message);
  }
});

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    reset: (state) => {
      state.status = "start";
      state.message = "";
    },
    addNewMessage: (state, action) => {
      state.messages = [...state.messages, action.payload];
    },
    updateMessageStatus: (state, action) => {
      if (state.lastMessagesState[action.payload]) {
        state.lastMessagesState[action.payload].isRead = true;
      }

      state.messages.forEach((m) => {
        if (m.inboxId === action.payload && !m.isRead) {
          m.isRead = true;
        }
      });
    },
    addLastMessage: (state, action) => {
      state.lastMessagesState[action.payload.roomId] =
        action.payload.messageToSend;
    },
    updateUserStatus: (state, action) => {
      if (
        state.selectedInbox &&
        state.selectedInbox.participant._id === action.payload.userId
      ) {
        state.selectedInbox.participant.status = action.payload.status;
      }
    },
    resetSelectedInbox: (state) => {
      state.selectedInbox = undefined;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getMyInbox.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getMyInbox.rejected, (state, action) => {
        state.status = "failed";
        state.message = action.payload as string;
      })
      .addCase(getMyInbox.fulfilled, (state, action) => {
        state.status = "idle";
        state.inbox = action.payload;

        action.payload.forEach(({ _id, lastMessage }) => {
          state.lastMessagesState[_id] = lastMessage;
        });
      })

      .addCase(getInboxChatHistory.rejected, (state, action) => {
        state.status = "failed";
        state.message = action.payload as string;
      })
      .addCase(getInboxChatHistory.fulfilled, (state, action) => {
        state.status = "idle";
        state.messages = action.payload;
      })

      .addCase(getInboxById.rejected, (state, action) => {
        state.status = "failed";
        state.message = action.payload as string;
      })
      .addCase(getInboxById.fulfilled, (state, action) => {
        state.status = "idle";
        state.selectedInbox = action.payload;
      });
  },
});

export const chat = (state: RootState) => state.chat;

export const {
  reset,
  addNewMessage,
  updateMessageStatus,
  resetSelectedInbox,
  updateUserStatus,
  addLastMessage,
} = chatSlice.actions;
export default chatSlice.reducer;
