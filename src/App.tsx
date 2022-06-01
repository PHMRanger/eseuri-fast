import { Component, createSignal } from 'solid-js';

import logo from './logo.svg';
import styles from './App.module.css';

import Text from "./controllers/text";
import { Menu } from './components/menu';


const FULL = `Prestigios critic literar și scriitor al perioadei interbelice, George Călinescu a respins proustianismul promovat de Camil Petrescu, optând pentru realismul clasic, de tip balzacian, pe care l-a depășit prin elementele de modernitate, un exemplu elocvent fiind Enigma Otiliei, roman social și citadin, publicat în anul 1938.
Viziunea realistă se observă în veridicitatea descrierilor locuințelor și ale străzilor bucureștene, ale vestimentației și fizionomiei personajelor, prezentate cu ajutorul tehnicii detaliului. Exactitatea științifică a elementelor de arhitectură, prezentarea tipurilor umane bine individualizate, descifrarea legăturilor existente între fizionomie, caracter și mediul social în care trăiesc personajele, tema moștenirii, motivul orfanului, al paternității și al avarului, sunt trăsături care conferă romanului caracter balzacian.
Cu toate acestea, romanul este o sinteză modernă a mai multor ideologii literare. Narațiunea cu tentă moralizatoare, este clară, neîncărcată stilistic, riguros organizată în spiritul clasicismului. Romantismul se reflectă în iubirea celor doi tineri, Felix și Otilia, ori în antiteza remarcată în gruparea simetrică a personajelor. Astfel, unei Otilii ingenue și dezinvolte i se opune o Georgetă uzată moral sau figura acră, de fată bătrână a Auricăi, iar protectorului Pascalopol, dublat de indulgentul general Păsărescu, i se contrapune imaginea avarului Giurgiuveanu, dublată de imaginea mătușii lui Stănică, Agripina. Deschiderile spre modernitate se observă în caracterul citadin, în spiritul critic, în ambiguitatea și complexitatea psihologică a personajelor prezentate cu ajutorul tehnicii poliedrice și a celei comportamentiste și în evoluția bolii unor personaje ca Simion Tulea sau Costache Giurgiuveanu. 
Perspectiva narativă este obiectivă, narațiunea la persoana a III-a, cu focalizare zero și viziune „din spate”, permițând menținerea unui narator omniscient, detașat de personaje și evenimente. Dar prezența personajului reflector Felix, care preia o parte din observațiile naratorului, creează senzația de limitare a omniscienței.
Enigma Otiliei este un roman prin amploarea narațiunii structurate în 20 de capitole, prin existența mai multor planuri narative, fiecare având o temă distinctă. Primul plan urmărește lupta pentru moștenirea lui Costache Giurgiuveanu, conflictul succesoral fiind generat de membrii clanului Tulea și amplificat prin prezența lui Stănică Rațiu. Planul al doilea dezvoltă tema formării unui tânăr, Felix Sima, care, venit în casa unchiului Costache cu aspirația de a-și face o carieră prestigioasă în medicină, se îndrăgostește de Otilia Mărculescu și, afectat de rivalitatea cu Pascalopol, trăiește un puternic conflict interior. Paralel cu tema moștenirii, formarea unei cariere sau iubirea, scriitorul surprinde imaginea burgheziei bucureștene de la începutul secolului al XX-lea. 
Incipitul fixează cadru spațio-temporal în manieră balzaciană: Într-o seară de la începutul lui iulie 1909, cu puțin înainte de orele zece, [...] în strada Antim. Însă cititorul este familiarizat și cu alte locuri din București și chiar cu împrejurimile acestuia, prezentându-se moșia lui Pascalopol, din Bărăgan. 
Romanul are structură sferică, incipitul și finalul focalizându-se asupra descrierii locuinței lui Costache Giurgiuveanu. Arhitectura reflectă o lume în declin, autorul evidențiind contrastul dintre pretențiile absurde ale unor burghezi snobi și adevărata lor realitate spirituală. Kitsch-ul remarcat în imitațiile grosolane și în amestecul de stiluri arhitectonice incompatibile, demonstrează incultura și grandomania proprietarilor, în timp ce clădirile degradate, cu ornamente făcute din materiale ieftine, dovedesc zgârcenia și caracterul lor delăsător. Intrarea lui Felix în casa din strada Antim, prin infernala ușă cu scârțâit îngrozitor, păzită de un Cerber hilar, schelălăitorul clopoțel, echivalează cu o descindere într-o lume a sufletelor moarte. Replica lui Giurgiuveanu aici nu stă nimeni, de care tânărul își va aminti în final, capătă conotații metaforice. Locatarii, Giurgiuveanu ori familia Tulea, sunt indivizi lipsiți de spirit, respingători prin răutate și lăcomie, Felix descoperind aici infernul familial. 
Acțiunea începe odată cu venirea tânărului Felix Sima la București. Orfan de ambii părinți, el va sta în casa tutorelui său Costache Giurgiuveanu, un rentier avar, care locuiește împreună cu fiica sa vitregă. Aici face cunoștință cu familia lui Costache, condusă autoritar de sora sa Aglae Tulea, care afișează o permanentă atitudine de ostilitate față de Otilia Mărculescu, dar și cu Leonida Pascalopol, un moșier care veghează asupra tinerei orfane. Sunt urmărite încercările clanului Tulea de a împiedica înfierea Otiliei și de a intra în posesia averii lui Giurgiuveanu. Deși o iubește sincer, teama de sora sa și propria-i avariție îl determină pe acesta să renunțe la înfierea fetei. În schimb, vinde din proprietăți și, la insistența lui Pascalopol, pune o parte din bani la bancă, pe numele fetei. Îmbolnăvindu-se, Stănică Rațiu profită de neputința lui și îi fură restul banilor, fapt care îi va provoca moartea. La scurt timp după aceea, Otilia pleacă la Paris și se căsătorește cu Pascalopol. Întâlnindu-l după mulți ani, Felix află că au divorțat, Otilia recăsătorindu-se cu un conte din Buenos Aires.
În celălalt plan, este urmărită evoluția lui Felix, care devine student la Medicină. Dând dovadă de tenacitate și de seriozitate, va triumfa de timpuriu, câștigând stima colegilor și a profesorilor universitari pe care-i asistă în spitale. Îndrăgostit de Otilia, suferă enorm când aceasta pleacă cu Pascalopol la Paris. Profitând, Stănică Rațiu îi face cunoștință cu Georgeta. Relația amoroasă cu această femeie îl maturizează și îi intensifică iubirea pentru Otilia. Chiar dacă îl iubește, în final, după moartea lui Giurgiuveanu, aceasta îl părăsește, înțelegând că au temperamente și aspirații diferite, fapt pentru care ea ar fi fost o piedică în calea realizării idealurilor lui profesionale. Felix va deveni medic renumit, profesor universitar și, prin căsătorie, va intra într-un cerc de persoane influente. 
În concluzie, oferind un fragment de viață, o frescă a Bucureștiului de dinainte de Primul Război Mondial, romanul Enigma Otiliei este, așa cum însuși George Călinescu își propunea, o scriere tipic realistă, remarcabilă prin „atenta observație a socialului, zugrăvirea unor caractere bine individualizate, gustul detaliului, observarea umanității sub latură morală” (Gheorghe Glodeanu). `;

const App: Component = () => {
  const [quote, setQuote] = createSignal(FULL.split("\n")[0]);

  setTimeout(() => setQuote(FULL.split("\n")[3]), 1e4);

  return (
    <div class={styles.App}>
      <Menu />
    </div>
  );
  // <div class={styles.App}>
  //   <Text>{FULL}</Text>
  // </div>
};

export default App;
