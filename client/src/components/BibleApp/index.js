import React, {useEffect, useState} from "react";
import { useMutation } from '@apollo/client';
import {
  Collapse,
  Container,
  Text,
  Textarea,
  Button,
  Grid,
  Modal,
  Spacer,
  Row,
  Col,
  Progress,
  Loading
} from "@nextui-org/react";
import "../../styles/Dashboard.css"

import {ADD_PASSAGE} from "../../utils/mutations";
import Auth from "../../utils/auth";
import { searchAllChapters, searchAllBooks, searchChapter, searchVerse } from "../../utils/bibleApi";


const BibleApp = (props) => {
  const [addPassage, {data, loading, error}] = useMutation(ADD_PASSAGE);


  const [version, setVersion] = useState('?translation=KJV');
  const [book, setBook] = useState('');
  const [chapter, setChapter] = useState('');
  const [verse, setVerse] = useState('');
  const [verseNumber, setVerseNumber] = useState('');

  const [holyBible, setHolyBible] = useState([]);

  const handleVersionClick = async (event) => {
    setVersion(event.target.closest('button').value);
  };

  const [allBooks, setAllBooks] = useState([]);
  const searchBible = async () => {
    const response = await searchAllBooks();
    setAllBooks(response);
  };

  const [allChapters, setAllChapters] = useState([]);
  const [bookName, setBookName] = useState('');
  const handleBookClick = async (event) => {
    event.preventDefault();
    setBook(event.target.closest('button').value);
    setBookName(event.target.closest('button').name);
    const response2 = await searchAllChapters(event.target.closest('button').value);
    setAllChapters(response2);
  };

  const [allVerses, setAllVerses] = useState([]);
  const handleChpClick = async (event) => {
    event.preventDefault();
    setChapter(event.target.closest('button').value);
    const response3 = await searchChapter(book, event.target.closest('button').value, version);
    setAllVerses(response3);
    setHolyBible(response3);
  };

  
  const handleVerseClick = async (event) => {
    event.preventDefault();
    setVerse(event.target.closest('button').value);
    setVerseNumber(event.target.closest('button').getAttribute('num'))
    const response4 = await searchVerse(book, chapter, event.target.closest('button').value, version);
    setHolyBible([response4])
  };

  const [showLoadingModal, setShowLoadingModal] = useState(false); 
  const [showSuccessModal, setShowSuccessModal] = useState(false); 

  const handlerToShowLoadingModal = () => {
    setShowLoadingModal(true);
  };

  const handlerToCloseLoadingModal = () => {
    setShowLoadingModal(false);
  };

  const handlerToShowSuccessModal = () => {
    setShowSuccessModal(true);
  };
  const handlerToCloseSuccessModal = () => {
    setShowSuccessModal(false);
  };


  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const text = document.querySelector('#bible-body').value;
    if (!text) {
      return;
    }

    handlerToShowLoadingModal();
    try {
      const userId = Auth.getReader().data._id;

      const {data} = await addPassage({
        variables: {
          title: `${bookName} ${chapter}${verseNumber? `:${verseNumber}`: ''}`,
          authorId: userId,
          fullText: text,
        },
      });
    } catch (err) {
      console.error(err);
    }
    handlerToCloseLoadingModal();
    handlerToShowSuccessModal();
    document.querySelector('#bible-body').value = '';
    props.refetch();  
  };
 

// ADD EXPANDED = FALSE ONCLICK FUNCTION

  useEffect(() => {
    searchBible()
  }, []);

  return (  
    <Collapse className="bible-app" bordered={true} title="Look Up a Bible Passage" subtitle={
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
              width: "100%",
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
                  }} onClick={handleBookClick} name={name} value={id} > {name} </Button>
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
                bordered={id == verse}
                key={index}
                css={{
                  height: "auto",
                  width: "25%",
                  border: 'groove lightgrey'
                }} onClick={handleVerseClick} num={verseId} value={id} > {verseId} </Button>
              )
              })}
              </Container>
            </Collapse>
          </Collapse.Group>
        </Grid>
      </Grid.Container>
      <Spacer></Spacer>
      <Collapse expanded bordered title='Your Selected Verses . . . .'>
        <Spacer y={1} />
        <Textarea
          fullWidth          
          bordered
          color="secondary"
          initialValue={holyBible.map(function({verse}) {
            return(
              verse+' '
            )}
          ).join('')
          }
          id="bible-body"
          />
          <Spacer></Spacer>
          <Button ghost onClick={handleFormSubmit} color="success">Submit Selected Passage</Button>
      </Collapse>

      <Modal open={showLoadingModal} onClose={handlerToCloseLoadingModal}>
        <Modal.Body>
          <Container align='center' justify="center" alignItems="center" alignContent="center" display="flex">
            <Loading>Using Natural Language Processing (NLP) to Process Your Passage!</Loading>
          </Container>
        </Modal.Body>
      </Modal>

      <Modal open={showSuccessModal} onClose={handlerToCloseSuccessModal}>
        <Modal.Body>
          <Container align='center' justify="center" alignItems="center">
            <Text h2 color="success">Success!</Text>
            <Text>Find Your New Passage Under "My Submissions" Above!</Text>
            <Button color={'success'} onClick={handlerToCloseSuccessModal}>Done</Button>
          </Container>
        </Modal.Body>
      </Modal>
    </Collapse>
  )
}
export default BibleApp;
