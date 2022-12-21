import { Router, Request, Response, NextFunction } from 'express';

import { userRouter } from '@modules/User/routes/user.routes';
import { planRouter } from '@modules/Plans/routes/plan.routes';
import { bannerRouter } from '@modules/Banners/routes/banner.routes';
import { commentRouter } from '@modules/Comments/routes/comment.routes';
import { examsRouter } from '@modules/Exams/routes/exams.routes';
import { patientDataRouter } from '@modules/PatientData/routes/patientData.routes';
import { patientMenuRouter } from '@modules/PatientMenu/routes/patienteMenu.routes';
import { physicalActivityRoutes } from '@modules/PhysicalActivity/routes/physicalActivity.routes';
import { certificateRouter } from '@modules/Certificates/routes/certificates.routes';
import { cardRouter } from '@modules/Cards/routes/card.routes';
import { docExamsRouter } from '@modules/DocExams/routes/docExams.routes';
import { goalsPatientRouter } from '@modules/GoalsPatient/routes/goalsPatient.routes';
import { awardsRouter } from '@modules/Awards/routes/awards.routes';
import { termsOfUseRouter } from '@modules/TermsOfUse/routes/TermsofUse.routes';
import { solicitationRouter } from '@modules/SolicitationRedeem/routes/solicitation.routes';

const router = Router();

router.use('/user', userRouter);
router.use('/plan', planRouter);
router.use('/banner', bannerRouter);
router.use('/comment', commentRouter);
router.use('/card', cardRouter);
router.use('/exams', examsRouter);
router.use('/patientData', patientDataRouter);
router.use('/patientMenu', patientMenuRouter);
router.use('/physicalActivity', physicalActivityRoutes);
router.use('/certificate', certificateRouter);
router.use('/docExams', docExamsRouter);
router.use('/goals', goalsPatientRouter);
router.use('/awards', awardsRouter);
router.use('/termsOfUse', termsOfUseRouter);
router.use('/solicitation', solicitationRouter);


router.get('/', (request: Request, response: Response) =>
  response.send('Carbon Free - 0.0.1'),
);

router.use((request: Request, response: Response, next: NextFunction) => {
  if (!request.route)
    return response.status(404).send(`${request.url} não encontrado`);
  return next();
});

export { router };
