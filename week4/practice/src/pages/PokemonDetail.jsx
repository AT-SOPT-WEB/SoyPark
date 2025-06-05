import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";

const PokemonDetail = () => {
    const { name } = useParams();
    const [pokemonDetail, setPokemonDetail] = useState(null);

    useEffect(()=> {
        const fetchDetail = async () => {
            try {
                const detail  = await axios.get(
                    `https://pokeapi.co/api/v2/pokemon/${name}`
                )
                console.log(detail);
                setPokemonDetail(detail.data);

            } catch (error) {
                console.error('포켓몬 정보 불러오기 실패', error);
            }
        }

        fetchDetail();
    }, [name]);

    if (!pokemonDetail) return <p>로딩 중...</p>;

    return(
        <div style={{ padding: '2rem' }}>
            <Link to={"/"}>목록으로</Link>
            <h1>{pokemonDetail.name.toUpperCase()}</h1>
            <img src={pokemonDetail.sprites.front_default} alt={pokemonDetail.name} width={150} />
            <p>
                <strong>Type: </strong>
                {pokemonDetail.types.map((t) => t.type.name).join(', ')}
            </p>
        </div>
    )
}

export default PokemonDetail;