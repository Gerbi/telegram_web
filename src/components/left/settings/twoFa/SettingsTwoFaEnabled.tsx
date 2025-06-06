import type { FC } from '../../../../lib/teact/teact';
import React, { memo } from '../../../../lib/teact/teact';
import { getActions } from '../../../../global';

import { SettingsScreens } from '../../../../types';

import { LOCAL_TGS_URLS } from '../../../common/helpers/animatedAssets';
import renderText from '../../../common/helpers/renderText';

import useHistoryBack from '../../../../hooks/useHistoryBack';
import useOldLang from '../../../../hooks/useOldLang';

import AnimatedIconWithPreview from '../../../common/AnimatedIconWithPreview';
import ListItem from '../../../ui/ListItem';

import lockPreviewUrl from '../../../../assets/lock.png';

type OwnProps = {
  isActive?: boolean;
  onReset: () => void;
};

const SettingsTwoFaEnabled: FC<OwnProps> = ({
  isActive, onReset,
}) => {
  const { openSettingsScreen } = getActions();
  const lang = useOldLang();

  useHistoryBack({
    isActive,
    onBack: onReset,
  });

  return (
    <div className="settings-content two-fa custom-scroll">
      <div className="settings-content-header no-border">
        <AnimatedIconWithPreview
          tgsUrl={LOCAL_TGS_URLS.Lock}
          previewUrl={lockPreviewUrl}
          size={160}
          className="settings-content-icon"
        />

        <p className="settings-item-description mb-3" dir="auto">
          {renderText(lang('EnabledPasswordText'), ['br'])}
        </p>
      </div>

      <div className="settings-item">
        <ListItem
          icon="edit"
          // eslint-disable-next-line react/jsx-no-bind
          onClick={() => openSettingsScreen({ screen: SettingsScreens.TwoFaChangePasswordCurrent })}
        >
          {lang('ChangePassword')}
        </ListItem>
        <ListItem
          icon="password-off"
          // eslint-disable-next-line react/jsx-no-bind
          onClick={() => openSettingsScreen({ screen: SettingsScreens.TwoFaTurnOff })}
        >
          {lang('TurnPasswordOff')}
        </ListItem>
        <ListItem
          icon="email"
          // eslint-disable-next-line react/jsx-no-bind
          onClick={() => openSettingsScreen({ screen: SettingsScreens.TwoFaRecoveryEmailCurrentPassword })}
        >
          {lang('SetRecoveryEmail')}
        </ListItem>
      </div>
    </div>
  );
};

export default memo(SettingsTwoFaEnabled);
