import LegalPage from '../legal/LegalPage';
import { PRIVACY } from '../legal/privacyContent';
import { mount } from '../mount.jsx';
import '../fonts.js';
import '../index.css';
import '../landing.css';

mount(<LegalPage doc={PRIVACY} kind="privacy" />);
