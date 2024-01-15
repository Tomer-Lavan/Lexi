import GetAppIcon from '@mui/icons-material/GetApp';
import OpenInFullIcon from '@mui/icons-material/OpenInFull';
import { Box, Checkbox, Link, Typography } from '@mui/material';
import React from 'react';
import { FitButton } from '../CommonFormStyles.s';
import {
    TermsBox,
    TermsButtonContainer,
    TermsFormControl,
    TermsMainContainer,
    TermsMenuContainer,
    TermsPaper,
} from './TermsOfConditions.s';

const htmlContent = `<h5 style="padding-top: 1pt;padding-left: 5pt;text-indent: 0pt;text-align: justify;">Consent Form - <i>Data collection for the research project: </i>“Talking with   a   Chatbot   about   emotional   experiences”</h5><p style="text-indent: 0pt;text-align: left;"><br></p><p style="padding-left: 5pt;text-indent: 0pt;text-align: justify;">Thank you for agreeing to take part in this study. You will participate in ongoing interactions with the Chatbot <i>Sam</i>, who will be asking you about your emotional experiences. You can chat with Sam for as long as you like for as many times as you like during the month-long period of the study. This research project aims at paving the way for promoting emotional expression to autonomous conversational agents (i.e., chatbots). The study is funded by <span class="s3">EPSRC ARoEQ Project. </span>Your insights will significantly contribute to our understanding of human interaction with chatbots in various contexts. Thank you for considering participation.</p><p style="text-indent: 0pt;text-align: left;"><br></p><h2 style="padding-left: 5pt;text-indent: 0pt;line-height: 15pt;text-align: left;">Researchers<span class="p">:</span></h2><p style="padding-left: 5pt;text-indent: 0pt;line-height: 15pt;text-align: left;">Dr Guy Laban, Dr Arik Cheshin, and Professor Hatice Gunes</p><p style="text-indent: 0pt;text-align: left;"><br></p><p style="text-indent: 0pt;text-align: left;"></p><p class="s4" style="padding-left: 5pt;text-indent: 0pt;text-align: justify;">Where     is     the     study     going     to     take     place? <span class="p">The interaction and all aspects of participation in the study will take place online on a website developed specifically for this study, and on Qualtrics. The study is organised by the Department of Computer Science and Technology, William Gates Building, JJ Thomson Avenue,            Cambridge,            CB30FD,            England.</span></p><p style="text-indent: 0pt;text-align: left;"><br></p><h2 style="padding-left: 5pt;text-indent: 0pt;text-align: justify;">What is the nature of the data collections and how will the information be stored and<span class="s4"> </span>analysed?</h2><p style="text-indent: 0pt;text-align: left;"><br></p><p style="padding-top: 2pt;padding-left: 5pt;text-indent: 0pt;text-align: justify;">Your involvement includes engaging with the chatbot Sam at your convenience. During your first interaction you will need to choose a username that will serve as your user ID, and you will be asked to provide demographic information. Before and after each interaction with Sam you will share your feelings through brief questionnaires. You may go on and participate as many times as you like during the month-long period of the study duration. You will not need to register every time you aim to interact with Sam the chatbot, but will only need to provide the username you chose for your participation. Each interaction can take as long as you wish for. Typically, the questionnaires can be completed in under 10 minutes, on average. The study aims to explore emotional expression related to current events.</p><p style="text-indent: 0pt;text-align: left;"><br></p><p style="padding-left: 5pt;text-indent: 0pt;text-align: justify;">Your privacy is paramount, as all data will be pseudonymized and securely stored. The data collected (text logs and questionnaire data) will be stored on a secure network and only the research team will make them available upon your approval. If you agree to participate, the data may be shared with researchers requiring data access for other similar ethically approved research protocols, where the same standards of confidentiality will apply. We are not collecting any sort of identifiable information.</p><p style="text-indent: 0pt;text-align: left;"><br></p><h2 style="padding-left: 5pt;text-indent: 0pt;text-align: justify;">What  are  the  benefits,  risks,  costs,  and  compensation  of  participation?</h2><p style="text-indent: 0pt;text-align: left;"><br></p><p style="padding-top: 2pt;padding-left: 5pt;text-indent: 0pt;text-align: justify;">The expected benefit of participants is having a safe space to disclose your emotions at any time you want. An additional benefit for participants is the contribution toward the creation of chatbots and artificial intelligence that can communicate with people naturally. The expected risks of participating are minimal, not to exceed those of everyday life.</p><p style="padding-top: 1pt;padding-left: 5pt;text-indent: 0pt;text-align: left;">There are no costs associated with taking part in this study.</p><p style="text-indent: 0pt;text-align: left;"><br></p><p class="s5" style="padding-left: 5pt;text-indent: 0pt;text-align: left;">Questions</p><p style="padding-top: 3pt;padding-left: 5pt;text-indent: 0pt;text-align: justify;">Your participation will be voluntary. If at any point, you do not wish to continue with the study, you can withdraw from the experiment. This will have no negative effects for you. You could withdraw from the experiment simply by telling the experimenter and ask for the deletion of the data recorded so far. At any time, you can contact us and ask for the deletion of your data, as long as it has not been analysed or published yet. The recorded data will be used by our team or researchers who require access to the data.</p><p style="padding-top: 2pt;padding-left: 6pt;text-indent: 0pt;text-align: justify;"><a href="mailto:gl538@cam.ac.uk" class="s8" target="_blank">If you have some questions or another query, please contact Dr Guy Laban by </a><span style=" color: #1154CC; font-family:Calibri, sans-serif; font-style: normal; font-weight: normal; text-decoration: underline; font-size: 12pt;">gl538@cam.ac.uk</span><a href="mailto:acheshin@univ.haifa.ac.il" class="s8" target="_blank">, Dr Arik Cheshin by </a><span style=" color: #1154CC; font-family:Calibri, sans-serif; font-style: normal; font-weight: normal; text-decoration: underline; font-size: 12pt;">acheshin@univ.haifa.ac.il</span><a href="mailto:hg410@cam.ac.uk" class="s8" target="_blank">, or Prof. Hatice Gunes by email at </a><a href="mailto:hg410@cam.ac.uk" class="s7" target="_blank">hg410@cam.ac.uk</a><a href="mailto:hg410@cam.ac.uk" class="s8" target="_blank">.</a></p><p style="text-indent: 0pt;text-align: left;"><br></p><p class="s5" style="padding-top: 2pt;padding-left: 5pt;text-indent: 0pt;text-align: left;">Consent Confirmation</p><p style="text-indent: 0pt;text-align: left;"><br></p><ul id="l1"><li data-list-text="●"><p class="s9" style="padding-top: 2pt;padding-left: 41pt;text-indent: -18pt;text-align: justify;">I confirm that I fully understood the purpose of the session and my involvement in it.</p></li><li data-list-text="●"><p class="s9" style="padding-left: 41pt;text-indent: -18pt;text-align: justify;">I confirm that all my questions regarding my involvement with this session have been answered to my satisfaction.</p></li><li data-list-text="●"><p class="s9" style="padding-left: 41pt;text-indent: -18pt;text-align: justify;">I confirm that I understand that I am not obliged to participate in this session and that I may withdraw from the session at any stage without the need to justify my decision and without personal disadvantage.</p></li><li data-list-text="●"><p class="s9" style="padding-left: 41pt;text-indent: -18pt;text-align: justify;">I confirm that I have understood that my data will be used for scientific publications in pseudonymous form, and I give informed consent to this usage.</p></li><li data-list-text="●"><p class="s9" style="padding-left: 41pt;text-indent: -18pt;text-align: justify;">I confirm that I understand that my data will be released for re-use by other researchers.</p></li></ul><p style="text-indent: 0pt;text-align: left;"><br></p><p class="s10" style="padding-left: 5pt;text-indent: 0pt;text-align: left;">Date     and     Place:     <u>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </u></p><p class="s10" style="padding-top: 6pt;padding-left: 5pt;text-indent: 0pt;line-height: 142%;text-align: left;">Name of the Participant: <u>&nbsp;</u> Signature of the Participant: <u>&nbsp;</u> Signature of the Experimenter: <u>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </u></p>`;
const termsPdfUrl = 'TermsOfConditions.pdf';

interface TermsOfConditionsProps {
    setPage: (page: number) => void;
    isAgreed: boolean;
    setIsAgreed: (isAgreed: boolean) => void;
}

const TermsOfConditions: React.FC<TermsOfConditionsProps> = ({ setPage, isAgreed, setIsAgreed }) => {
    const handleAgreeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIsAgreed(event.target.checked);
    };

    return (
        <TermsMainContainer>
            <Typography variant="h5" gutterBottom>
                Terms and Conditions
            </Typography>
            <TermsPaper>
                <TermsBox>
                    <TermsMenuContainer>
                        <Link href={termsPdfUrl} width={'fit-content'} download>
                            <GetAppIcon />
                        </Link>
                        <Link href={termsPdfUrl} width={'fit-content'} download>
                            <OpenInFullIcon />
                        </Link>
                    </TermsMenuContainer>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Full Terms and Conditions
                    </Typography>
                    <Box dangerouslySetInnerHTML={{ __html: htmlContent }} />
                </TermsBox>
            </TermsPaper>
            <TermsFormControl
                control={
                    <Checkbox checked={isAgreed} onChange={handleAgreeChange} name="agreed" color="primary" />
                }
                label="I agree to the Terms and Conditions"
            />
            <TermsButtonContainer>
                <FitButton
                    variant="outlined"
                    color="primary"
                    onClick={() => {
                        setPage(1);
                    }}
                >
                    Back
                </FitButton>
                <FitButton
                    variant="contained"
                    color="primary"
                    disabled={!isAgreed}
                    onClick={() => {
                        setPage(3);
                    }}
                >
                    Continue
                </FitButton>
            </TermsButtonContainer>
        </TermsMainContainer>
    );
};

export default TermsOfConditions;
