import React, { useEffect, useState } from "react";
import MainGrid from '../src/components/MainGrid'
import Box from '../src/components/Box'
import ProfileSidebar from '../src/components/ProfileSidebar'
import FriendList from "../src/components/FriendList";
import GitHubService from "../src/api/";
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations'
import { AlurakutMenu, OrkutNostalgicIconSet } from '../src/lib/AlurakutCommons'


export default function Home() {

  const [username, setUsername] = useState([]);

  useEffect(() => {
    GitHubService.getUsername().then((userName) => setUsername(userName));
  }, []);


  return (
    <>
      <AlurakutMenu />
      <MainGrid>
        <div className="profileArea" style={{ gridArea: 'profileArea' }}>
          <ProfileSidebar username={username.login} />
        </div>
        <div className="welcomeArea" style={{ gridArea: 'welcomeArea' }}>
          <Box>
            <h1 className="title">
              Bem vindo(a), <strong>{username.login}</strong>
            </h1>

            <OrkutNostalgicIconSet fas={1} confiavel={3} legal={3} sexy={1} />
          </Box>
        </div>
        <div className="profileRelationsArea" style={{ gridArea: 'profileRelationsArea' }}>
          <ProfileRelationsBoxWrapper>
            <FriendList />
          </ProfileRelationsBoxWrapper>
        </div>
      </MainGrid>
    </>
  )
}
