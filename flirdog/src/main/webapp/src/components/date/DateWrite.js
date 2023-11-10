import React from 'react';
import Header from '../main/Header';
import Footer from '../main/Footer';
import Container from 'react-bootstrap/esm/Container';
import TableCss from '../../css/date/dateWrite.module.css';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

const DateWrite = () => {
    return (
        <div>
            <Header></Header>
            <div>
              <Container><div className={TableCss.DateTitle}>
                  <div className={TableCss.DateTitleDiv}>
                  매칭 글 작성
                  </div>
                </div>
                </Container>
            </div>
            <hr className={TableCss.dateHr}/>
            <Container>
              <form className={TableCss.formTable}>
                <div className={TableCss.formTableDiv}>
                <Form>
                    <Row className="mb-3">
                      <Form.Group as={Col} controlId="formGridTitle">
                        <div className={TableCss.FormTitleDiv} >
                          <div className={TableCss.FormTitleNameDiv} >
                            제 목
                          </div>&nbsp;&nbsp;&nbsp;
                          <Form.Control className={TableCss.FormTitleInput} size="lg" type="text" placeholder="제목을 입력해주세요." />
                        </div>
                      </Form.Group>
                    </Row>

                    <Row className="mb-3">
                      <Form.Group as={Col} controlId="formGridEmail">
                        <div className={TableCss.FormTitleDiv} >
                          <div className={TableCss.FormTitleNameDiv} >
                            글 분류
                          </div>&nbsp;&nbsp;&nbsp;
                          <Form.Control className={TableCss.FormTitleInput} size="lg" type="text" placeholder="제목을 입력해주세요." />
                        </div>
                      </Form.Group>

                      <Form.Group as={Col} controlId="formGridEmail">
                        <div className={TableCss.FormTitleDiv} >
                          <div className={TableCss.FormTitleNameDiv} >
                            강아지 이름
                          </div>&nbsp;&nbsp;&nbsp;
                          <Form.Control className={TableCss.FormTitleInput} size="lg" type="text" placeholder="제목을 입력해주세요." />
                        </div>
                      </Form.Group>

                      <Form.Group as={Col} controlId="formGridEmail">
                        <div className={TableCss.FormTitleDiv} >
                          <div className={TableCss.FormTitleNameDiv} >
                            성 별
                          </div>&nbsp;&nbsp;&nbsp;
                          <Form.Control className={TableCss.FormTitleInput} size="lg" type="text" placeholder="제목을 입력해주세요." />
                        </div>
                      </Form.Group>
                    </Row>

                    <Row className="mb-3">
                      <Form.Group as={Col} controlId="formGridEmail">
                        <div className={TableCss.FormTitleDiv} >
                          <div className={TableCss.FormTitleNameDiv} >
                            나 이
                          </div>&nbsp;&nbsp;&nbsp;
                          <Form.Control className={TableCss.FormTitleInput} size="lg" type="text" placeholder="제목을 입력해주세요." />
                        </div>
                      </Form.Group>

                      <Form.Group as={Col} controlId="formGridEmail">
                        <div className={TableCss.FormTitleDiv} >
                          <div className={TableCss.FormTitleNameDiv} >
                            중성화 여부
                          </div>&nbsp;&nbsp;&nbsp;
                          <Form.Control className={TableCss.FormTitleInput} size="lg" type="text" placeholder="제목을 입력해주세요." />
                        </div>
                      </Form.Group>

                      <Form.Group as={Col} controlId="formGridEmail">
                        <div className={TableCss.FormTitleDiv} >
                          <div className={TableCss.FormTitleNameDiv} >
                            멍BTI
                          </div>&nbsp;&nbsp;&nbsp;
                          <Form.Control className={TableCss.FormTitleInput} size="lg" type="text" placeholder="제목을 입력해주세요." />
                        </div>
                      </Form.Group>
                    </Row>

                    <Row className="mb-3">
                      <Form.Group as={Col} controlId="formGridTitle">
                        <div className={TableCss.FormTitleDiv} >
                          <div className={TableCss.FormTitleNameDiv} >
                            거주지
                          </div>&nbsp;&nbsp;&nbsp;
                          <Form.Control className={TableCss.FormTitleInput} size="lg" type="text" placeholder="제목을 입력해주세요." />
                        </div>
                      </Form.Group>
                    </Row>

                    <Row className="mb-3">
                      <Form.Group as={Col} controlId="formGridTitle">
                        <div className={TableCss.FormTitleDiv} >
                          <div className={TableCss.FormTitleNameDiv} >
                            상세 내용
                          </div>
                        </div>
                        <Form.Control as="textarea" rows={20} />
                      </Form.Group>
                    </Row>

                    <Button variant="primary" type="submit">
                      Submit
                    </Button>
                  </Form>
                  </div>
              </form>
            </Container>
            <Footer></Footer>
        </div>
    );
};

export default DateWrite;