// Language selector using react-select
import Select from 'react-select';
import { SUPPORTED_LANGUAGES } from '../../utils/languageConfig.js';
import { socket, SOCKET_EVENTS } from '../../socket/socket.js';
import useEditorStore from '../../store/useEditorStore.js';
import useRoomStore from '../../store/useRoomStore.js';
import { preloadPython } from '../../services/executionService.js';

const LanguageSelector = () => {
  const { language, setLanguage } = useEditorStore();
  const { roomId } = useRoomStore();

  const currentOption =
    SUPPORTED_LANGUAGES.find((l) => l.value === language) || SUPPORTED_LANGUAGES[0];

  const handleChange = (option) => {
    setLanguage(option.value);

    if (option.value === 'python') {
      preloadPython();
    }

    if (roomId) {
      socket.emit(SOCKET_EVENTS.LANGUAGE_CHANGE, {
        roomId,
        language: option.value,
      });
    }
  };

  const customStyles = {
    control: (base, state) => ({
      ...base,
      backgroundColor: 'rgba(20, 20, 30, 0.9)',
      borderColor: state.isFocused ? '#a855f7' : 'rgba(255, 255, 255, 0.1)',
      borderRadius: '999px',
      padding: '2px 8px',
      minHeight: '40px',
      boxShadow: 'none',
      cursor: 'pointer',
      '&:hover': {
        borderColor: '#a855f7',
      },
    }),
    menu: (base) => ({
      ...base,
      backgroundColor: '#12121a',
      border: '1px solid rgba(168, 85, 247, 0.4)',
      borderRadius: '12px',
      overflow: 'hidden',
      marginTop: '8px',
      boxShadow: '0 10px 40px rgba(0, 0, 0, 0.5)',
    }),
    menuPortal: (base) => ({
      ...base,
      zIndex: 9999,
    }),
    menuList: (base) => ({
      ...base,
      padding: 6,
      maxHeight: '300px',
      backgroundColor: '#12121a',
    }),
    option: (base, state) => ({
      ...base,
      backgroundColor: state.isSelected
        ? 'rgba(168, 85, 247, 0.4)'
        : state.isFocused
        ? 'rgba(168, 85, 247, 0.15)'
        : 'transparent',
      color: '#fff',
      borderRadius: '8px',
      cursor: 'pointer',
      padding: '10px 14px',
      fontFamily: 'VT323, monospace',
      fontSize: '18px',
      transition: 'all 0.2s ease',
      '&:active': {
        backgroundColor: 'rgba(168, 85, 247, 0.5)',
      },
    }),
    singleValue: (base) => ({
      ...base,
      color: '#fff',
      fontFamily: 'VT323, monospace',
      fontSize: '18px',
    }),
    input: (base) => ({
      ...base,
      color: '#fff',
    }),
    dropdownIndicator: (base) => ({
      ...base,
      color: '#a1a1aa',
      '&:hover': { color: '#fff' },
    }),
    indicatorSeparator: () => ({ display: 'none' }),
  };

  return (
    <div className="min-w-[180px]">
      <Select
        value={currentOption}
        onChange={handleChange}
        options={SUPPORTED_LANGUAGES}
        styles={customStyles}
        isSearchable={false}
        placeholder="Language..."
        menuPortalTarget={document.body}
        menuPosition="fixed"
      />
    </div>
  );
};

export default LanguageSelector;