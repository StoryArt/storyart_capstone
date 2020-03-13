package com.storyart.commentservice.service;

import com.storyart.commentservice.dto.report.ReportCommentRequestDTO;
import com.storyart.commentservice.dto.report.ReportCommentResponseDTO;
import org.springframework.data.domain.Page;

public interface ReportService {
    void reportComment(ReportCommentRequestDTO reportCommentRequestDTO);
    Page<ReportCommentResponseDTO> getListReportComment(int pageNo, int pageSize);
    //minh co can lam tinh nang huy repỏt ko, chắc là k
    //k thay thằng nào làm vụ này :v

    //anh thu len youtube report 1 cai thu coi
    //chịu :v
    //đó h a thấy game hay gì cũng v,rp rồi thôi à
    //anh thu quay lai comment anh vua repỏt nay xe
    //    co nut remove ko
    //nãy report xong nó mất tiêu luôn, k cho mình thấy cmnt đó nữa
    //    oh
    //ko co luu lai lich su luon ta
    //ừa đúng r, k cần thiết đâu
    //bên admin handle r mới ban hay k ma`
    //ok anh
    //chac minh phai lam them cai an comment doi voi nguoi vua report =))
    //cũng đc, hoặc cứ tô sáng cái cờ lên, là xong :v
    //    Ok, em review toi day thoi
    //    anh nho dung xoa may comment nay di nha
    //de co gi biet note cho nao, sua phan nao
    //sau khi anh sua r anh push len, em check ok het thi anh ms xoa comment nha, ok e,
    //    ok anh, bye bye e, tyvm
}
