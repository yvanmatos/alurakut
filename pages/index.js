import React, { useEffect, useState } from "react";
import nookies from 'nookies';
import jwt from 'jsonwebtoken';
import MainGrid from '../src/components/MainGrid'
import Box from '../src/components/Box'
import ProfileSidebar from '../src/components/ProfileSidebar'
import FriendItem from "../src/components/FriendItem";
import CommunityItem from "../src/components/CommunityItem";
import GitHubService from "../src/api/";
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations'
import { AlurakutMenu, OrkutNostalgicIconSet } from '../src/lib/AlurakutCommons'


export default function Home(props) {
  const user = props.githubUser
  const [friends, setFriends] = useState([]);
  const [userCommunity, setCommunity ] = useState([

  ]);
  
  useEffect(() => {
    GitHubService.getFollowers(user).then((friendsList) =>
      setFriends(friendsList)
    );

    // API GRAPHQL
    fetch('https://graphql.datocms.com/', { 
      method: 'POST',
      headers: {
        'Authorization': '973c09066f42d294f9f0ba2d36c001',
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({ "query": ` query {
        allCommunities {
          title
          id
          imageUrl
          creatorslug
        }
      }`})
    })
    .then((res) => res.json())
    .then((respostaCompleta) => {
      const userCommunity = respostaCompleta.data.allCommunities
      setCommunity(userCommunity)
    })
  }, []);


  return (
    <>
      <AlurakutMenu githubUser={user} />
      <MainGrid>
        <div className="profileArea" style={{ gridArea: 'profileArea' }}>
          <ProfileSidebar username={user} />
        </div>
        <div className="welcomeArea" style={{ gridArea: 'welcomeArea' }}>
          <Box>
            <h1 className="title">
              Bem vindo(a), <strong>{user}</strong>
            </h1>

            <OrkutNostalgicIconSet fas={2} confiavel={3} legal={3} sexy={2} />
          </Box>
          <Box>
          <h2 className="subTitle">O que você deseja fazer?</h2>
            <form onSubmit={(e) => {
              e.preventDefault()

              const communityFormData = new FormData(e.target)
              
              const community = {                
                title : communityFormData.get('title'),
                imageUrl: communityFormData.get('image'),
                creatorslug: user
              }

              fetch('/api/comunidades', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(community)
              })
              .then(async (res) => {
                const dados = await res.json()
                const community = dados.record
                const updatedCommunities = [...userCommunity, community]
                setCommunity(updatedCommunities)                
              })
              

              
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
              return (
                <CommunityItem
                  id={community.id}
                  name={community.title}
                  img_url={community.imageUrl}
                />
              );
            })}
          </ul>
          </ProfileRelationsBoxWrapper>
          <ProfileRelationsBoxWrapper>
          <>
            <h2 className="smallTitle">
              Seguidevs ({ friends.length })
            </h2>
            <ul>
              {friends.map((friend) => {
                return (
                  <FriendItem
                    key={friend.login}
                    html_url={friend.html_url}
                    login={friend.login}
                    avatar_url={friend.avatar_url}
                  />
                );
              })}
            </ul>
          </>
          </ProfileRelationsBoxWrapper>
        </div>
      </MainGrid>
    </>
  )
}

export async function getServerSideProps(context) {
  const cookies = nookies.get(context)
  const token = cookies.USER_TOKEN;
  const { githubUser } = jwt.decode(token);
  
  const { isAuthenticated } = await fetch('https://alurakut.vercel.app/api/auth', {
    headers: {
        Authorization: token
      }
  })
  .then((resposta) => resposta.json())
  
  if(!isAuthenticated) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      }
    }
  }


  return {
    props: {
      githubUser
    }, // will be passed to the page component as props
  }
} 