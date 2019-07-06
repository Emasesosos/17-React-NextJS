import MasterPage from './../components/Master';
import Precio from './../components/Precio';
import Noticias from './../components/Noticias';
import Eventos from './../components/Eventos';
import fetch from 'isomorphic-unfetch';


const Index = (props) => (
    <MasterPage>
        <div className="row">
            <div className="col-12">
                <h2>Precio del Bitcoin</h2>
                <Precio
                        precio={props.precioBitcoin}
                ></Precio>
                { /*console.log(prop.precioBitcoin)*/ }
            </div>
            <div className="col-md-8">
                <h2 className="my-4">Noticias sobre Bitcoin</h2>
                <Noticias
                            noticias={props.noticias}
                ></Noticias>
                { /*console.log(props.noticias)*/ }
            </div>
            <div className="col-md-4">
                <h2 className="my-4">Próximos Eventos Bitcoin</h2>
                <Eventos
                            eventos={props.eventos}
                ></Eventos>
                { /* console.log(props.eventos) */ }
            </div>
        </div>
    </MasterPage>
);

Index.getInitialProps = async () => {
    const precio = await fetch('https://api.coinmarketcap.com/v2/ticker/1/');
    //const noticias = await fetch('https://newsapi.org/v2/everything?q=bitcoin&from=2019-05-22&sortBy=publishedAt&apiKey=36ab97c3f38b4a879b7259e94b29843e&language=es');
    const noticias = await fetch('https://newsapi.org/v2/everything?q=bitcoin&sortBy=publishedAt&apiKey=6c1c1dfcb4a943c7bf481bc628b80153&language=es');
    const eventos = await fetch('https://www.eventbriteapi.com/v3/events/search/?token=M5FF6KD4C72VPBKWTY4N');

    const resPrecio = await precio.json();
    const resNoticias = await noticias.json();
    const resEventos = await eventos.json();

    return {
        precioBitcoin: resPrecio.data.quotes.USD,
        noticias: resNoticias.articles,
        eventos: resEventos.events
    }
}

export default Index;