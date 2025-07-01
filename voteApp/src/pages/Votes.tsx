import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/react';
import Membres from '../components/Membres';

const Votes: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Enregistrement des votes</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <Membres />
      </IonContent>
    </IonPage>
  );
};

export default Votes;
