import React, { useEffect, useState } from "react";
import MainGrid from '../src/components/MainGrid'
import Box from '../src/components/Box'
import ProfileSidebar from '../src/components/ProfileSidebar'
import FriendList from "../src/components/FriendList";
import CommunityItem from "../src/components/CommunityItem";
import GitHubService from "../src/api/";
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations'
import { AlurakutMenu, OrkutNostalgicIconSet } from '../src/lib/AlurakutCommons'


export default function Home() {

  const [username, setUsername] = useState([]);
  const [userCommunity, setCommunity ] = useState([{
    id: "1234",
    title: "Eu abro a geladeira pra pensar.",
    image: "https://www.fatosdesconhecidos.com.br/wp-content/uploads/2015/05/gelad-575x400.jpg"
  }]);

  

  useEffect(() => {
    GitHubService.getUsername().then((userName) => setUsername(userName));
  }, []);


  return (
    <>
      <AlurakutMenu githubUser={username.login} />
      <MainGrid>
        <div className="profileArea" style={{ gridArea: 'profileArea' }}>
          <ProfileSidebar username={username.login} />
        </div>
        <div className="welcomeArea" style={{ gridArea: 'welcomeArea' }}>
          <Box>
            <h1 className="title">
              Bem vindo(a), <strong>{username.login}</strong>
            </h1>

            <OrkutNostalgicIconSet fas={2} confiavel={3} legal={3} sexy={2} />
          </Box>
          <Box>
          <h2 className="subTitle">O que você deseja fazer?</h2>
            <form onSubmit={(e) => {
              e.preventDefault()

              const communityFormData = new FormData(e.target)
              
              const community = {
                id: new Date().toISOString(),
                title : communityFormData.get('title'),
                img_url: communityFormData.get('image')
              }

              const updatedCommunities = [...userCommunity, community]
              setCommunity(updatedCommunities)
              
            }}>
              <div>
                <input 
                  placeholder="Qual vai ser o nome da sua comunidade?" 
                  name="title" 
                  aria-label="Qual vai ser o nome da sua comunidade?" 
                  type="text"
                />
              </div>
              <div>
                <input 
                  placeholder="Coloque uma URL para usarmos de capa." 
                  name="image" 
                  aria-label="Coloque uma URL para usarmos de capa." 
                  type="text"
                />
              </div>
              <button>
                Criar Comunidade
              </button>
            </form>
          </Box>
        </div>
        <div className="profileRelationsArea" style={{ gridArea: 'profileRelationsArea' }}>
          <ProfileRelationsBoxWrapper>
          <h2 className="smallTitle">
            Comunidades ({ userCommunity.length })
          </h2>
          <ul>
            {userCommunity.map((community) => {
                console.log(userCommunity)
              return (
                <CommunityItem
                  key={community.id}
                  name={community.title}
                  img_url={community.image}
                />
              );
            })}
          </ul>
          </ProfileRelationsBoxWrapper>
          <ProfileRelationsBoxWrapper>
            <FriendList quantidade={6} randomico={true} />
          </ProfileRelationsBoxWrapper>
        </div>
      </MainGrid>
    </>
  )
}
