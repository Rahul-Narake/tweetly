import axios from 'axios';
import { atom, selector } from 'recoil';

export type MessageType = {
  id: string;
  body: string;
  senderId: number;
  createdAt: Date;
  shouldShake?: boolean;
};

export type SelectedConversionState = {
  selectedUser: ConversationType | null;
  messages: MessageType[];
};

const conversationsSelector = selector({
  key: 'conversationsSelector',
  get: async () => {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_WEBSOCKT_BASE_URL}/conversations`
    );
    return data.users as ConversationType[];
  },
});

export const conversationsAtom = atom<ConversationType[] | null>({
  key: 'conversationsAtom',
  default: conversationsSelector,
});

export const selectedConversionAtom = atom<SelectedConversionState>({
  key: 'selectedConversionAtom',
  default: {
    selectedUser: null,
    messages: [],
  },
});

const selectedConversionSelector = selector({
  key: 'selectedConversionSelector',
  get: async () => {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_WEBSOCKT_BASE_URL}/conversations`
    );
    return data.users as ConversationType[];
  },
});

export const selectedUserAtom = atom<ConversationType | null>({
  key: 'selectedUserAtom',
  default: null,
});

export const messagesAtom = atom<MessageType[]>({
  key: 'messagesAtom',
  default: [],
});

export const isSearchingAtom = atom<Boolean>({
  key: 'isSearchingAtom',
  default: false,
});
