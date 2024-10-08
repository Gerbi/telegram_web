import React, { memo } from '../../lib/teact/teact';
import { withGlobal } from '../../global';

import type { TabState } from '../../global/types';

import { selectTabState } from '../../global/selectors';
import { pick } from '../../util/iteratees';

import AttachBotInstallModal from './attachBotInstall/AttachBotInstallModal.async';
import BoostModal from './boost/BoostModal.async';
import ChatlistModal from './chatlist/ChatlistModal.async';
import CollectibleInfoModal from './collectible/CollectibleInfoModal.async';
import GiftCodeModal from './giftcode/GiftCodeModal.async';
import InviteViaLinkModal from './inviteViaLink/InviteViaLinkModal.async';
import MapModal from './map/MapModal.async';
import OneTimeMediaModal from './oneTimeMedia/OneTimeMediaModal.async';
import ReportAdModal from './reportAd/ReportAdModal.async';
import StarsBalanceModal from './stars/StarsBalanceModal.async';
import StarsPaymentModal from './stars/StarsPaymentModal.async';
import StarsTransactionInfoModal from './stars/transaction/StarsTransactionModal.async';
import UrlAuthModal from './urlAuth/UrlAuthModal.async';
import WebAppModal from './webApp/WebAppModal.async';

// `Pick` used only to provide tab completion
type ModalKey = keyof Pick<TabState,
'giftCodeModal' |
'boostModal' |
'chatlistModal' |
'urlAuth' |
'mapModal' |
'oneTimeMediaModal' |
'inviteViaLinkModal' |
'requestedAttachBotInstall' |
'collectibleInfoModal' |
'reportAdModal' |
'starsBalanceModal' |
'isStarPaymentModalOpen' |
'webApp' |
'starsTransactionModal'
>;

type StateProps = {
  [K in ModalKey]?: TabState[K];
};
type ModalRegistry = {
  [K in ModalKey]: React.FC<{
    modal: TabState[K];
  }>;
};
type Entries<T> = {
  [K in keyof T]: [K, T[K]];
}[keyof T][];

const MODALS: ModalRegistry = {
  webApp: WebAppModal,
  giftCodeModal: GiftCodeModal,
  boostModal: BoostModal,
  chatlistModal: ChatlistModal,
  urlAuth: UrlAuthModal,
  oneTimeMediaModal: OneTimeMediaModal,
  inviteViaLinkModal: InviteViaLinkModal,
  requestedAttachBotInstall: AttachBotInstallModal,
  reportAdModal: ReportAdModal,
  collectibleInfoModal: CollectibleInfoModal,
  mapModal: MapModal,
  isStarPaymentModalOpen: StarsPaymentModal,
  starsBalanceModal: StarsBalanceModal,
  starsTransactionModal: StarsTransactionInfoModal,
};
const MODAL_KEYS = Object.keys(MODALS) as ModalKey[];
const MODAL_ENTRIES = Object.entries(MODALS) as Entries<ModalRegistry>;

const ModalContainer = (modalProps: StateProps) => {
  return MODAL_ENTRIES.map(([key, ModalComponent]) => (
    // @ts-ignore -- TS does not preserve tuple types in `map` callbacks
    <ModalComponent key={key} modal={modalProps[key]} />
  ));
};

export default memo(withGlobal(
  (global): StateProps => (
    pick(selectTabState(global), MODAL_KEYS)
  ),
)(ModalContainer));
