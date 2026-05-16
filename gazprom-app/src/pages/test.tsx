import { Theme, presetGpnDefault } from '@consta/uikit/Theme';
import { Button } from '@consta/uikit/Button';

export default function Test() {
  return (
    <Theme preset={presetGpnDefault}>
      <div style={{ padding: 40 }}>
        <Button label="Сохранить" />
      </div>
    </Theme>
  );
}

