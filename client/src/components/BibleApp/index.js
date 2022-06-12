import React, {useEffect, useState} from "react";
import {
  Collapse,
  Container,
  Text,
  Textarea,
  Button,
  Grid,
} from "@nextui-org/react";
import { searchAllChapters, searchAllBooks, searchChapter, searchVerse } from "../../utils/bibleApi";


var version = '?translation=KJV';
var book = '';
var chapter = '';
var verse = "";

const BibleApp = () => {
  const [holyBible, setHolyBible] = useState([]);

  const handleVersionClick = async (event) => {
    event.preventDefault();
    version = event.target.closest('button').value;
  };

  const [allBooks, setAllBooks] = useState([]);
  const searchBible = async () => {
    const response = await searchAllBooks();
    setAllBooks(response)
  };

  const [chapters, setChapters] = useState([]);
  const handleBookClick = async (event) => {
    event.preventDefault();
    book = event.target.closest('button').value
    const response2 = await searchAllChapters(book);
    setChapters(response2);
  };

  const [singleChapters, setSingleChapter] = useState([]);
  const handleChpClick = async (event) => {
    event.preventDefault();
    chapter = event.target.closest('button').value;
    const response3 = await searchChapter(book, chapter, version);
    setSingleChapter(response3);
    setHolyBible(response3)
  };

  
  const handleVerseClick = async (event) => {
    event.preventDefault();
    verse = event.target.closest('button').value;
    const response4 = await searchVerse(book, chapter, verse, version);
    setHolyBible([response4])
  };
 

// ADD EXPANDED = FALSE ONCLICK FUNCTION

  useEffect(() => {
    searchBible()
  }, []);

  return (  
    <Container className="current-engagements-box">
      <Collapse bordered title="Bible" subtitle={
        <>
        <Text b>Welcome to our Bible app!</Text> Click <Text b>Here</Text> to open! 
        </>
        }>
        <Grid.Container 
          css={{
            display:'flex',
            // flexDirection:'column',
            height: "auto",
            minWidth: "100%",
            width: "100%",
            flexWrap:'wrap',
          }}>
          <Grid xs={12}>
            <Collapse.Group 
              bordered
              lined="true"
              aria-label="list-of-contributions"
              css={{
                // display:'flex',
                // flexDirection:'column',
                // height: "auto",
                // minWidth: "50%",
                width: "100%",
                // justifyContent:"flex-start",
                // alignSelf:'flex-start',
                // flexWrap:'wrap',
              }}>
              <Collapse title="Version" subtitle={
                <>
                  Please select your prefered <Text b>Version</Text> 
                </>
                }
              >
                <Container css={{
                    display:'flex',
                    flexDirection:'row',
                    height: "auto",
                    width: "100%"
                  }}
                  >
                  <Button css={{
                      height: "auto",
                      width: "25%",
                      border: 'groove lightgrey'
                    }} onClick={handleVersionClick} value="?translation=ASV">American Standard Version ASV</Button>
                  <Button css={{
                      height: "auto",
                      width: "25%",
                      border: 'groove lightgrey'
                    }} onClick={handleVersionClick} value="?translation=BBE">Bible in Basic English BBE</Button>
                  <Button css={{
                      height: "auto",
                      width: "25%",
                      border: 'groove lightgrey'
                    }} onClick={handleVersionClick} value="?translation=ESV">English Standar Version ESV</Button>
                  <Button css={{
                      height: "auto",
                      width: "25%",
                      border: 'groove lightgrey'
                    }} onClick={handleVersionClick} value="?translation=KJV">King James Version KJV</Button>
                  <Button css={{
                      height: "auto",
                      width: "25%",
                      border: 'groove lightgrey'
                    }} onClick={handleVersionClick} value="?translation=NIV">New International Version NIV</Button>
                  <Button css={{
                      height: "auto",
                      width: "25%",
                      border: 'groove lightgrey'
                    }} onClick={handleVersionClick} value="?translation=NLT">New Living Translation NLT</Button>
                  <Button css={{
                      height: "auto",
                      width: "25%",
                      border: 'groove lightgrey'
                    }} onClick={handleVersionClick} value="?translation=YLT">Young's Literal Translation YLT</Button>
                </Container>
              </Collapse>
              <Collapse
                title="Books"
                subtitle={
                  <>
                    Please select the <Text b>Book</Text> you would like to read
                  </>
                }
              >
                <Container 
                  css={{
                    display:'flex',
                    flexDirection:'row',
                    height: "auto",
                    // minWidth: "50%",
                    width: "100%",
                    // flexWrap:'wrap',
                    // MAP FUNCTION HERE +++++++++++++++++++++++++++++++++++++++++++++++++++++++++
                  }}>{allBooks.map(function({id, name}, index) {
                  return(
                    <Button 
                    key={index}
                    css={{
                      height: "auto",
                      width: "25%",
                      border: 'groove lightgrey'
                    }} onClick={handleBookClick} value={id} > {name} </Button>
                  )
                  })}
                </Container>
              </Collapse>
              <Collapse title="Chapter" 
                subtitle={
                <>
                For the whole <Text b>Chapter</Text> click here
                </>
                }>
                  <Container
                  css={{
                    display:'flex',
                    flexDirection:'row',
                    height: "auto",
                    // minWidth: "50%",
                    width: "100%",
                    // flexWrap:'wrap',
                    // MAP FUNCTION HERE +++++++++++++++++++++++++++++++++++++++++++++++++++++++++
                  }}>{chapters.map(function({id}, index) {
                  return(
                    <Button 
                    key={index}
                    css={{
                      height: "auto",
                      width: "25%",
                      border: 'groove lightgrey'
                    }} onClick={handleChpClick} value={id} > {id} </Button>
                  )
                  })}
                  </Container>
              </Collapse>
              <Collapse
                title="Verse"
                subtitle={
                  <>
                    After selecting a chapter, for a single <Text b>Verse</Text> click here
                  </>
                }
              >
                <Container
                  css={{
                  display:'flex',
                  flexDirection:'row',
                  height: "auto",
                  // minWidth: "50%",
                  width: "100%",
                  // flexWrap:'wrap',
                  // MAP FUNCTION HERE +++++++++++++++++++++++++++++++++++++++++++++++++++++++++
                }}>{singleChapters.map(function({id, verseId}, index) {
                return(
                  <Button 
                  key={index}
                  css={{
                    height: "auto",
                    width: "25%",
                    border: 'groove lightgrey'
                  }} onClick={handleVerseClick} value={id} > {verseId} </Button>
                )
                })}
                </Container>
              </Collapse>
            </Collapse.Group>
          </Grid>
          <Grid xs={12}>
            <Textarea
            bordered
            color="secondary"
            label="Your selected chapter/verse will appear here"
            initialValue={holyBible.map(function({verse}) {
              return(
                verse+' '
              )}
            ).join('')
            }
            
            maxRows={17}
            css={{
            width: '100%',
            height: '100%',
            }}
            />
          </Grid>
        </Grid.Container>
      </Collapse>
    </Container>
  )
}
export default BibleApp;