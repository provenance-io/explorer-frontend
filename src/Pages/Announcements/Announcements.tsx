import React from 'react';
import { Section, Wrapper, Header } from 'Components';
import { AnnouncementsList } from './Components';

const Announcements = () => (
  <Wrapper>
    <Header title="All Announcements" />
    <Section header>
      <AnnouncementsList />
    </Section>
  </Wrapper>
);

export default Announcements;