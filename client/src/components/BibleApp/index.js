import React, {useEffect, useState} from "react";
import {
  Collapse,
  Container,
  Text,
  Textarea,
  Button,
  Grid,
  Tooltip,
  Spacer
} from "@nextui-org/react";
import {IconButton} from "../../components/Icons/IconButton";
// import {ClipboardIcon} from "../../components/Icons/ClipboardIcon";
import {CopyIcon} from "../../components/Icons/CopyIcon";
import "../../styles/Dashboard.css"
import ClipboardJS from "clipboard";

import { searchAllChapters, searchAllBooks, searchChapter, searchVerse } from "../../utils/bibleApi";


const BibleApp = () => {
  new ClipboardJS(".copy-button");

  const [version, setVersion] = useState('?translation=KJV');
  const [book, setBook] = useState('');
  const [chapter, setChapter] = useState('');
  const [verse, setVerse] = useState('');

  const [holyBible, setHolyBible] = useState([]);

  const handleVersionClick = async (event) => {
    setVersion(event.target.closest('button').value);
  };

  const [allBooks, setAllBooks] = useState([]);
  const searchBible = async () => {
    const response = await searchAllBooks();
    setAllBooks(response)
  };

  const [allChapters, setAllChapters] = useState([]);
  const handleBookClick = async (event) => {
    event.preventDefault();
    const response2 = await searchAllChapters(event.target.closest('button').value);
    setBook(event.target.closest('button').value);
    setAllChapters(response2);
  };

  const [allVerses, setAllVerses] = useState([]);
  const handleChpClick = async (event) => {
    event.preventDefault();
    const response3 = await searchChapter(book, event.target.closest('button').value, version);
    setChapter(event.target.closest('button').value);
    setAllVerses(response3);
    setHolyBible(response3);
  };

  
  const handleVerseClick = async (event) => {
    event.preventDefault();
    const response4 = await searchVerse(book, chapter, event.target.closest('button').value, version);
    setVerse(event.target.closest('button').value);
    setHolyBible([response4])
  };
 

// ADD EXPANDED = FALSE ONCLICK FUNCTION

  useEffect(() => {
    searchBible()
  }, []);

  return (  
    <Collapse className="bible-app" bordered title="Import a Bible Passage" subtitle={
      <>
     Click <Text b>Here</Text> to open/close
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
                  {}
                <Button bordered={version=="?translation=ASV"} css={{
                    height: "auto",
                    width: "25%",
                    border: 'groove lightgrey'
                  }} onClick={handleVersionClick} value="?translation=ASV">American Standard Version ASV</Button>
                <Button bordered={version=="?translation=BBE"} css={{
                    height: "auto",
                    width: "25%",
                    border: 'groove lightgrey'
                  }} onClick={handleVersionClick} value="?translation=BBE">Bible in Basic English BBE</Button>
                <Button bordered={version=="?translation=ESV"} css={{
                    height: "auto",
                    width: "25%",
                    border: 'groove lightgrey'
                  }} onClick={handleVersionClick} value="?translation=ESV">English Standar Version ESV</Button>
                <Button bordered={version == "?translation=KJV"} css={{
                    height: "auto",
                    width: "25%",
                    border: 'groove lightgrey'
                  }} onClick={handleVersionClick} value="?translation=KJV">King James Version KJV</Button>
                <Button bordered={version == "?translation=NIV"} css={{
                    height: "auto",
                    width: "25%",
                    border: 'groove lightgrey'
                  }} onClick={handleVersionClick} value="?translation=NIV">New International Version NIV</Button>
                <Button bordered={version == "?translation=NLT"} css={{
                    height: "auto",
                    width: "25%",
                    border: 'groove lightgrey'
                  }} onClick={handleVersionClick} value="?translation=NLT">New Living Translation NLT</Button>
                <Button bordered={version == "?translation=YLT"} css={{
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
                  bordered={id == book}
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
                }}>{allChapters.map(function({id}, index) {
                return(
                  <Button 
                  key={index}
                  bordered={id == chapter}
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
              }}>{allVerses.map(function({id, verseId}, index) {
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
      </Grid.Container>
      <Container>
        <Spacer y={1} />
        <div className="submit-title-and-paste-button">
          <Text h3>Your Selected Scripture . . . . </Text>
          <Tooltip color="secondary" content="COPY to your clipboard">
            <IconButton className="copy-button" data-clipboard-action="copy" data-clipboard-target="#bible-body" onClick={() => console.log("COPY button pressed")}>
              <CopyIcon size={26} fill="#962bc4" />
            </IconButton>
          </Tooltip>
        </div>
        <Textarea
          bordered
          color="secondary"
          initialValue={holyBible.map(function({verse}) {
            return(
              verse+' '
            )}
          ).join('')
          }
          id="bible-body"
          maxRows={17}
          css={{
          width: '100%',
          height: '100%',
          }}
          />
      </Container>
    </Collapse>
  )
}
export default BibleApp;
