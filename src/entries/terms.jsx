import LegalPage from '../legal/LegalPage';
import { TERMS } from '../legal/termsContent';
import { mount } from '../mount.jsx';
import '../fonts.js';
import '../index.css';
import '../landing.css';

mount(<LegalPage doc={TERMS} kind="terms" />);
